"use client";

// Compatibilità temporanea: ogni vecchio import apre il modal di contatto,
// senza rendere nuovamente accessibile il form preventivo.
export {
  ContactModalProvider as QuoteModalProvider,
  useContactModal as useQuoteModal,
} from "./ContactModalProvider";
