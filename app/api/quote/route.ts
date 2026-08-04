import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "../../config/site";
import { getPreliminaryEstimate } from "../../lib/estimate";
import {
  consumptionBandLabels,
  isConsumptionBand,
  normalizePhone,
  type QuoteRequestPayload,
  validateQuoteRequest,
} from "../../lib/quote";
import { createRoofMap } from "../../lib/roof-map";

export const runtime = "nodejs";

const maxRequestBytes = 12_000;
const idempotencyKeyPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

class RequestBodyTooLargeError extends Error {}

async function readRequestText(request: NextRequest) {
  const reader = request.body?.getReader();

  if (!reader) {
    return "";
  }

  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      totalBytes += value.byteLength;

      if (totalBytes > maxRequestBytes) {
        await reader.cancel().catch(() => undefined);
        throw new RequestBodyTooLargeError();
      }

      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;

  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(bytes);
}

function escapeSpreadsheetFormula(value: string | null) {
  if (value === null || !/^[\s]*[=+\-@]/.test(value)) {
    return value;
  }

  return `'${value}`;
}

function isQuoteRequestPayload(value: unknown): value is QuoteRequestPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;

  return (
    typeof payload.idempotencyKey === "string" &&
    (payload.consumptionBand === null || isConsumptionBand(payload.consumptionBand)) &&
    typeof payload.address === "string" &&
    (payload.coordinates === null || typeof payload.coordinates === "object") &&
    typeof payload.fullName === "string" &&
    typeof payload.email === "string" &&
    typeof payload.phone === "string" &&
    typeof payload.message === "string" &&
    typeof payload.privacyAcknowledged === "boolean" &&
    typeof payload.marketingConsent === "boolean" &&
    typeof payload.website === "string"
  );
}

function jsonError(message: string, status: number, fieldErrors?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, fieldErrors }, { status });
}

export async function POST(request: NextRequest) {
  if (process.env.QUOTE_FORM_ENABLED !== "true") {
    return NextResponse.json(
      {
        ok: false,
        message:
          "La richiesta online non è disponibile in questo momento. Per maggiori informazioni, contattaci telefonicamente.",
      },
      { status: 410 },
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);

  if (!contentType.includes("application/json")) {
    return jsonError("Formato della richiesta non valido.", 415);
  }

  if (Number.isFinite(contentLength) && contentLength > maxRequestBytes) {
    return jsonError("La richiesta è troppo grande.", 413);
  }

  let rawBody: string;

  try {
    rawBody = await readRequestText(request);
  } catch (error) {
    if (error instanceof RequestBodyTooLargeError) {
      return jsonError("La richiesta è troppo grande.", 413);
    }

    return jsonError("Impossibile leggere la richiesta.", 400);
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError("Impossibile leggere la richiesta.", 400);
  }

  if (!isQuoteRequestPayload(body)) {
    return jsonError("I dati inviati non sono validi.", 400);
  }

  const fieldErrors = validateQuoteRequest(body);

  if (Object.keys(fieldErrors).length > 0) {
    return jsonError("Controlla i campi evidenziati.", 422, fieldErrors);
  }

  if (body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  if (!idempotencyKeyPattern.test(body.idempotencyKey)) {
    return jsonError("I dati inviati non sono validi.", 400);
  }

  const consumptionBand = body.consumptionBand;
  const coordinates = body.coordinates;

  if (!isConsumptionBand(consumptionBand) || !coordinates) {
    return jsonError("I dati inviati non sono validi.", 422);
  }

  const submittedAt = new Date().toISOString();
  const leadId = body.idempotencyKey;
  const estimate = getPreliminaryEstimate(consumptionBand);
  const webhookUrl = process.env.MAKE_QUOTE_WEBHOOK_URL;
  const isDemoSubmission =
    !webhookUrl && process.env.QUOTE_DEMO_MODE === "true";

  if (isDemoSubmission) {
    return NextResponse.json({
      ok: true,
      leadId,
      estimate,
      isDemoSubmission: true,
    });
  }

  if (!webhookUrl) {
    return jsonError(
      "Il servizio di invio non è ancora configurato. Riprova più tardi.",
      503,
    );
  }

  const roof = await createRoofMap(coordinates, leadId);
  const fullName = body.fullName.trim();
  const normalizedEmail = body.email.trim().toLowerCase();
  const normalizedPhone = normalizePhone(body.phone);
  const address = body.address.trim();
  const message = body.message.trim() || null;
  const consumptionLabel = consumptionBandLabels[consumptionBand];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestType: "quote",
        leadId,
        submittedAt,
        consumptionBand,
        consumptionLabel,
        address,
        coordinates,
        message,
        estimate,
        roof,
        contact: {
          fullName,
          email: normalizedEmail,
          phone: normalizedPhone,
        },
        privacy: {
          acknowledged: true,
          noticeVersion: siteConfig.privacyNoticeVersion,
          acknowledgedAt: submittedAt,
          marketingConsent: body.marketingConsent,
        },
        // Mantiene la compatibilità con le intestazioni e il mapping Make del form precedente.
        nome: escapeSpreadsheetFormula(fullName),
        email: escapeSpreadsheetFormula(normalizedEmail),
        telefono: normalizedPhone,
        indirizzo: escapeSpreadsheetFormula(address),
        bolletta_mensile: consumptionLabel,
        esito_stimato: estimate.shortConfiguration,
        messaggio: escapeSpreadsheetFormula(message),
        produzione_stimata: estimate.production,
        risparmio_stimato: estimate.savings,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Webhook response was not successful");
    }
  } catch {
    return jsonError(
      "Non siamo riusciti a inviare la richiesta. Riprova tra poco.",
      502,
    );
  } finally {
    clearTimeout(timeout);
  }

  return NextResponse.json({ ok: true, leadId, estimate, isDemoSubmission: false });
}
