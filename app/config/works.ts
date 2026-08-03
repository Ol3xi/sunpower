export interface WorkMetric {
  label: string;
  value: string;
}

export interface WorkItem {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  services: string[];
  metrics: WorkMetric[];
}

// Le immagini e i dati qui sotto sono esempi di configurazione: possono essere
// sostituiti con realizzazioni e risultati certificati quando saranno disponibili.
export const featuredWork: WorkItem = {
  id: "casa-energia-completa",
  category: "Configurazione tipo · Casa indipendente",
  title: "Fotovoltaico, accumulo e ricarica in un unico ecosistema.",
  description:
    "Una soluzione pensata per produrre, conservare e usare l'energia quando serve davvero: dalla casa all'auto elettrica.",
  image: "/works/featured-solar-home.png",
  imageAlt:
    "Casa mediterranea con pannelli fotovoltaici sul tetto e auto elettrica nel vialetto",
  services: ["Fotovoltaico", "Sistema di accumulo", "E-Mobility"],
  metrics: [
    { value: "6 kWp", label: "Impianto fotovoltaico" },
    { value: "10 kWh", label: "Energia accumulabile" },
    { value: "7,4 kW", label: "Ricarica domestica" },
  ],
};

export const recentWorks: WorkItem[] = [
  {
    id: "casa-con-accumulo",
    category: "Energia sempre disponibile",
    title: "Più autonomia, anche dopo il tramonto.",
    description:
      "Fotovoltaico e accumulo dialogano per valorizzare ogni kWh prodotto durante il giorno.",
    image: "/works/solar-storage-home.png",
    imageAlt:
      "Casa moderna su due livelli con pannelli fotovoltaici e batteria di accumulo esterna",
    services: ["Fotovoltaico", "Accumulo"],
    metrics: [
      { value: "5,4 kWp", label: "Potenza fotovoltaica" },
      { value: "10 kWh", label: "Sistema di accumulo" },
    ],
  },
  {
    id: "casa-con-wallbox",
    category: "Mobilità elettrica a casa",
    title: "La tua energia diventa chilometri.",
    description:
      "Un impianto integrato per gestire la ricarica dell'auto con la produzione solare della casa.",
    image: "/works/solar-ev-home.png",
    imageAlt:
      "Casa con pannelli fotovoltaici, auto elettrica e wallbox nel vialetto",
    services: ["Fotovoltaico", "Wallbox"],
    metrics: [
      { value: "6 kWp", label: "Potenza fotovoltaica" },
      { value: "7,4 kW", label: "Wallbox intelligente" },
    ],
  },
  {
    id: "casa-elettrica",
    category: "Comfort elettrico tutto l'anno",
    title: "Calore, fresco e sole in perfetto equilibrio.",
    description:
      "Pompa di calore e fotovoltaico lavorano insieme per una casa più efficiente in ogni stagione.",
    image: "/works/solar-heat-pump-home.png",
    imageAlt:
      "Casa in pietra con pannelli fotovoltaici e pompa di calore esterna",
    services: ["Fotovoltaico", "Pompa di calore"],
    metrics: [
      { value: "5,8 kWp", label: "Potenza fotovoltaica" },
      { value: "A+++", label: "Classe pompa di calore" },
    ],
  },
];
