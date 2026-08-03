export type ProcessIcon = "chat" | "home" | "blueprint" | "spark";

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  detail: string;
  icon: ProcessIcon;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Raccontaci la tua casa",
    description:
      "Ci parli dei tuoi consumi, dei tuoi obiettivi e degli spazi disponibili. Bastano poche informazioni per iniziare.",
    detail: "Consumi · esigenze · indirizzo",
    icon: "chat",
  },
  {
    number: "02",
    title: "Studiamo la soluzione",
    description:
      "Analizziamo esposizione, abitudini e requisiti tecnici per definire la configurazione più sensata per te.",
    detail: "Analisi preliminare · sopralluogo quando necessario",
    icon: "home",
  },
  {
    number: "03",
    title: "Ricevi una proposta chiara",
    description:
      "Ti presentiamo un progetto su misura, con componenti, attività previste e condizioni spiegate in modo comprensibile.",
    detail: "Progetto · pratiche · preventivo",
    icon: "blueprint",
  },
  {
    number: "04",
    title: "Installiamo e restiamo presenti",
    description:
      "Coordiniamo l'installazione e le pratiche; dopo l'attivazione ti aiutiamo a monitorare il tuo nuovo sistema.",
    detail: "Installazione · attivazione · assistenza",
    icon: "spark",
  },
];
