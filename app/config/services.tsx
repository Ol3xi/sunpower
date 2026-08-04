// src/config/services.tsx
import { ReactNode } from "react";
import { TargetAndTransition } from "framer-motion";

export interface ServiceDetails {
  heading: string;
  description: string;
  idealFor: string;
  includes: string[];
}

// Definiamo il "modello" dei nostri dati per avere l'autocompletamento ed evitare errori
export interface ServiceItem {
  id: string;
  badge?: string; // Il punto interrogativo significa che è opzionale
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
  color: string;
  aura: string;
  iconBg: string;
  loopAnim: TargetAndTransition;
  loopDuration: number;
  details: ServiceDetails;
}

// Esportiamo l'array dei servizi
export const services: ServiceItem[] = [
  {
    id: "fotovoltaico",
    badge: "Più Richiesto",
    title: "Fotovoltaico",
    description: "Impianti ad alta efficienza per abbattere i costi. Progettazione su misura per il tuo tetto.",
    features: ["Risparmio fino al 90%", "Pannelli Tier 1 garantiti", "Gestione pratiche inclusa"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    color: "text-amber-500",
    aura:
      "radial-gradient(circle at center, rgba(251, 191, 36, 0.30) 0%, rgba(251, 191, 36, 0.12) 42%, transparent 72%)",
    iconBg: "bg-amber-50 border-amber-100 shadow-inner shadow-amber-200/50",
    loopAnim: { rotate: [0, 8, -8, 0] },
    loopDuration: 6,
    details: {
      heading: "Produci energia in modo più autonomo.",
      description:
        "Studiamo tetto, consumi e abitudini per dimensionare un impianto che abbia senso per la tua casa.",
      idealFor:
        "Chi vuole ridurre l'energia acquistata dalla rete e valorizzare gli spazi esposti al sole.",
      includes: [
        "Analisi di fattibilità e dimensionamento dell'impianto",
        "Progettazione e installazione curate dal nostro team",
        "Supporto per le pratiche applicabili al tuo caso",
      ],
    },
  },
  {
    id: "accumulo",
    title: "Accumulo",
    description: "Immagazzina l'energia prodotta di giorno e utilizzala di notte. Indipendenza totale.",
    features: ["Protezione dai Blackout", "Batterie al Litio compatte", "Monitoraggio da App"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16v11H4V7zm18 3v5h2v-5h-2z" /></svg>,
    color: "text-emerald-500",
    aura:
      "radial-gradient(circle at center, rgba(52, 211, 153, 0.28) 0%, rgba(52, 211, 153, 0.10) 42%, transparent 72%)",
    iconBg: "bg-emerald-50 border-emerald-100 shadow-inner shadow-emerald-200/50",
    loopAnim: { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] },
    loopDuration: 3,
    details: {
      heading: "Usa anche la sera l'energia prodotta di giorno.",
      description:
        "Valutiamo capacità, consumi e priorità per aumentare l'autoconsumo della tua energia solare.",
      idealFor:
        "Chi consuma soprattutto fuori dalle ore di sole o vuole avere più continuità nell'uso dell'energia prodotta.",
      includes: [
        "Dimensionamento della batteria in base alle tue abitudini",
        "Integrazione con il fotovoltaico e i carichi di casa",
        "Monitoraggio semplice dell'energia disponibile",
      ],
    },
  },
  {
    id: "pompe-calore",
    badge: "Incentivi Attivi",
    title: "Pompe di Calore",
    description: "Sostituisci la vecchia caldaia. Riscaldamento e raffrescamento 100% elettrico e green.",
    features: ["Zero emissioni in casa", "Detrazioni fiscali 65%", "Integrazione con fotovoltaico"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    color: "text-blue-500",
    aura:
      "radial-gradient(circle at center, rgba(96, 165, 250, 0.28) 0%, rgba(96, 165, 250, 0.10) 42%, transparent 72%)",
    iconBg: "bg-blue-50 border-blue-100 shadow-inner shadow-blue-200/50",
    loopAnim: { y: [0, -4, 0] },
    loopDuration: 4,
    details: {
      heading: "Riscalda e raffresca usando l'elettricità.",
      description:
        "Analizziamo casa, impianto esistente e comfort desiderato per capire come integrare una pompa di calore.",
      idealFor:
        "Chi vuole superare la caldaia tradizionale o abbinare il comfort domestico alla produzione fotovoltaica.",
      includes: [
        "Valutazione tecnica degli spazi e dell'impianto esistente",
        "Configurazione su misura per riscaldamento e raffrescamento",
        "Supporto sulle pratiche eventualmente applicabili",
      ],
    },
  },
  {
    id: "mobilita",
    title: "E-Mobility",
    description: "Ricarica la tua auto elettrica comodamente a casa sfruttando l'energia dei tuoi pannelli.",
    features: ["Ricarica intelligente", "Wallbox di design", "Compatibile con ogni EV"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    color: "text-indigo-500",
    aura:
      "radial-gradient(circle at center, rgba(129, 140, 248, 0.28) 0%, rgba(129, 140, 248, 0.10) 42%, transparent 72%)",
    iconBg: "bg-indigo-50 border-indigo-100 shadow-inner shadow-indigo-200/50",
    loopAnim: { rotate: [0, 10, -5, 0], scale: [1, 1.1, 1] },
    loopDuration: 2,
    details: {
      heading: "Ricarica l'auto in modo intelligente a casa.",
      description:
        "Progettiamo la wallbox in base al veicolo, alla potenza disponibile e al tuo impianto domestico.",
      idealFor:
        "Chi vuole ricaricare la propria auto elettrica con più controllo, comodità e integrazione con il fotovoltaico.",
      includes: [
        "Verifica dell'impianto elettrico e della potenza disponibile",
        "Installazione della wallbox e configurazione iniziale",
        "Impostazioni intelligenti per gestire la ricarica",
      ],
    },
  }
];
