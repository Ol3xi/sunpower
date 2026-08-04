import { Buffer } from "node:buffer";
import type { Coordinates } from "./quote";

const staticMapsEndpoint =
  "https://static-maps-api.arcgis.com/arcgis/rest/services/static-maps-service/v1/static-maps/arcgis/imagery/with-point";

const roofImageTimeoutMs = 4_000;
const maxRoofImageBytes = 2_500_000;
const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

export type RoofImage = {
  status: "available" | "not-configured" | "unavailable";
  provider: "arcgis-static-maps";
  fileName?: string;
  mimeType?: string;
  dataBase64?: string;
  attribution: string;
};

export type RoofMap = {
  coordinates: Coordinates;
  googleMapsUrl: string;
  image: RoofImage;
};

export function createGoogleMapsUrl({ latitude, longitude }: Coordinates) {
  const query = encodeURIComponent(`${latitude.toFixed(6)},${longitude.toFixed(6)}`);

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export async function createRoofMap(
  coordinates: Coordinates,
  leadId: string,
): Promise<RoofMap> {
  const googleMapsUrl = createGoogleMapsUrl(coordinates);
  const token = process.env.ARCGIS_STATIC_MAPS_TOKEN;

  if (!token) {
    return {
      coordinates,
      googleMapsUrl,
      image: {
        status: "not-configured",
        provider: "arcgis-static-maps",
        attribution:
          "Anteprima satellitare non ancora configurata. Usa il link Google Maps per visualizzare il tetto.",
      },
    };
  }

  const parameters = new URLSearchParams({
    x: coordinates.longitude.toFixed(6),
    y: coordinates.latitude.toFixed(6),
    centerX: coordinates.longitude.toFixed(6),
    centerY: coordinates.latitude.toFixed(6),
    zoom: "20",
    width: "900",
    height: "600",
    format: "png",
    symbolStyle: "pin",
    symbolColor: "00C389",
    symbolScale: "1.5",
    padding: "10",
    referenceDetails: "none",
    attribution: "auto",
  });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), roofImageTimeoutMs);

  try {
    const response = await fetch(`${staticMapsEndpoint}?${parameters}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error("Static map response was not successful");
    }

    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";
    const contentLengthHeader = response.headers.get("content-length");
    const contentLength = contentLengthHeader ? Number(contentLengthHeader) : null;

    if (
      !contentType.startsWith("image/png") ||
      (contentLength !== null &&
        Number.isFinite(contentLength) &&
        (contentLength <= 0 || contentLength > maxRoofImageBytes))
    ) {
      throw new Error("Static map response is not a valid PNG image");
    }

    const image = Buffer.from(await response.arrayBuffer());

    if (
      image.byteLength < pngSignature.byteLength ||
      image.byteLength > maxRoofImageBytes ||
      !image.subarray(0, pngSignature.byteLength).equals(pngSignature)
    ) {
      throw new Error("Static map image has an invalid size");
    }

    return {
      coordinates,
      googleMapsUrl,
      image: {
        status: "available",
        provider: "arcgis-static-maps",
        fileName: `tetto-${leadId}.png`,
        mimeType: "image/png",
        dataBase64: image.toString("base64"),
        attribution:
          "L'attribuzione dei dati geografici è inclusa nell'immagine satellitare.",
      },
    };
  } catch {
    return {
      coordinates,
      googleMapsUrl,
      image: {
        status: "unavailable",
        provider: "arcgis-static-maps",
        attribution:
          "Anteprima satellitare non disponibile. Usa il link Google Maps per visualizzare il tetto.",
      },
    };
  } finally {
    clearTimeout(timeout);
  }
}
