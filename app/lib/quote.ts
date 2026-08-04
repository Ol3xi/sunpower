export const consumptionBands = [
  "under-100",
  "100-200",
  "200-300",
  "over-300",
] as const;

export type ConsumptionBand = (typeof consumptionBands)[number];

export const consumptionBandLabels: Record<ConsumptionBand, string> = {
  "under-100": "Meno di 100 €",
  "100-200": "Tra 100 € e 200 €",
  "200-300": "Tra 200 € e 300 €",
  "over-300": "Oltre 300 €",
};

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type QuoteRequestPayload = {
  idempotencyKey: string;
  consumptionBand: ConsumptionBand | null;
  address: string;
  coordinates: Coordinates | null;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  privacyAcknowledged: boolean;
  marketingConsent: boolean;
  website: string;
};

export type QuoteFieldErrors = Partial<
  Record<
    | "consumptionBand"
    | "address"
    | "location"
    | "fullName"
    | "email"
    | "phone"
    | "message"
    | "privacyAcknowledged",
    string
  >
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isConsumptionBand(value: unknown): value is ConsumptionBand {
  return typeof value === "string" && consumptionBands.includes(value as ConsumptionBand);
}

export function normalizePhone(value: string) {
  return value.replace(/\D/g, "");
}

export function validateQuoteRequest(payload: QuoteRequestPayload): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};

  if (!isConsumptionBand(payload.consumptionBand)) {
    errors.consumptionBand = "Seleziona una fascia di spesa.";
  }

  if (!payload.address.trim() || payload.address.trim().length > 220) {
    errors.address = "Inserisci un indirizzo valido.";
  }

  if (
    !payload.coordinates ||
    !Number.isFinite(payload.coordinates.latitude) ||
    !Number.isFinite(payload.coordinates.longitude) ||
    payload.coordinates.latitude < -90 ||
    payload.coordinates.latitude > 90 ||
    payload.coordinates.longitude < -180 ||
    payload.coordinates.longitude > 180
  ) {
    errors.location = "Cerca e conferma la posizione del tetto.";
  }

  const name = payload.fullName.trim();
  if (name.length < 2 || name.length > 100) {
    errors.fullName = "Inserisci nome e cognome.";
  }

  if (!emailPattern.test(payload.email.trim()) || payload.email.trim().length > 254) {
    errors.email = "Inserisci un indirizzo email valido.";
  }

  const phone = normalizePhone(payload.phone);
  if (phone.length < 9 || phone.length > 15) {
    errors.phone = "Inserisci un numero di telefono valido.";
  }

  if (payload.message.trim().length > 1_200) {
    errors.message = "Il messaggio può contenere al massimo 1.200 caratteri.";
  }

  if (!payload.privacyAcknowledged) {
    errors.privacyAcknowledged = "Per inviare la richiesta devi prendere visione dell'informativa privacy.";
  }

  return errors;
}
