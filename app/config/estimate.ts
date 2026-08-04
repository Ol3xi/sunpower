import type { ConsumptionBand } from "../lib/quote";

export type EstimateScenario = {
  shortConfiguration: string;
  configuration: string;
  production: string;
  savings: string;
};

export const preliminaryEstimateConfig: {
  isDemo: boolean;
  label: string;
  disclaimer: string;
  scenarios: Record<ConsumptionBand, EstimateScenario>;
} = {
  // Lascia true finché i valori non saranno definiti con dati tecnici e commerciali reali.
  isDemo: true,
  label: "Dati dimostrativi",
  disclaimer:
    "Questi valori sono dimostrativi e non costituiscono un preventivo. La configurazione reale viene verificata dopo l'analisi del tetto e dei consumi.",
  scenarios: {
    "under-100": {
      shortConfiguration: "3–4 kWp",
      configuration: "Fotovoltaico 3–4 kWp",
      production: "4.000–5.200 kWh/anno",
      savings: "800–1.050 €/anno",
    },
    "100-200": {
      shortConfiguration: "4,5–6 kWp",
      configuration: "Fotovoltaico 4,5–6 kWp",
      production: "5.800–7.800 kWh/anno",
      savings: "1.150–1.550 €/anno",
    },
    "200-300": {
      shortConfiguration: "6–8 kWp",
      configuration: "Fotovoltaico 6–8 kWp",
      production: "7.800–10.400 kWh/anno",
      savings: "1.550–2.050 €/anno",
    },
    "over-300": {
      shortConfiguration: "8–10 kWp",
      configuration: "Fotovoltaico 8–10 kWp",
      production: "10.400–13.000 kWh/anno",
      savings: "2.050–2.600 €/anno",
    },
  },
};
