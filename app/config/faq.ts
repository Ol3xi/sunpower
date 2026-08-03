export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "Da dove si parte per capire qual è la soluzione giusta?",
    answer:
      "Da una prima analisi di consumi, abitudini e spazi disponibili. Queste informazioni ci aiutano a capire quali soluzioni approfondire e con quale configurazione iniziare.",
  },
  {
    question: "È sempre necessario fare un sopralluogo?",
    answer:
      "Possiamo iniziare con una valutazione preliminare a distanza. Quando serve verificare tetto, impianti o spazi tecnici, programmiamo un sopralluogo per definire il progetto con maggiore precisione.",
  },
  {
    question: "Ho bisogno anche di un sistema di accumulo?",
    answer:
      "Dipende da quando consumi energia, da come vuoi usare l'impianto e dai tuoi obiettivi. L'accumulo può essere utile per valorizzare l'energia prodotta nelle ore in cui il sole non c'è, ma va dimensionato sul caso specifico.",
  },
  {
    question: "Posso integrare un impianto già esistente?",
    answer:
      "Spesso è possibile, ma dipende dalla configurazione, dalla compatibilità dei componenti e dallo stato dell'impianto. La valutazione va fatta caso per caso prima di definire una proposta.",
  },
  {
    question: "Fotovoltaico, pompa di calore e wallbox possono lavorare insieme?",
    answer:
      "Sì, possono essere valutati come un unico sistema. L'analisi iniziale serve proprio a capire come far dialogare produzione, comfort domestico e ricarica dell'auto in modo sensato.",
  },
  {
    question: "Quanto tempo richiede il progetto?",
    answer:
      "Dipende dalla configurazione, dalle verifiche tecniche necessarie e dalle pratiche applicabili. Nella proposta ti indichiamo con chiarezza le attività previste e gli step successivi.",
  },
  {
    question: "Ci sono incentivi o agevolazioni disponibili?",
    answer:
      "Le condizioni possono cambiare in base a normativa, periodo e situazione personale. Durante la valutazione verifichiamo quali opportunità possono essere considerate nel tuo caso.",
  },
];
