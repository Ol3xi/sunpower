// src/config/services.tsx
import { ReactNode } from "react";
import { TargetAndTransition } from "framer-motion";

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
    aura: "bg-amber-400/20 group-hover:bg-amber-400/50",
    iconBg: "bg-amber-50 border-amber-100 shadow-inner shadow-amber-200/50",
    loopAnim: { rotate: [0, 8, -8, 0] },
    loopDuration: 6
  },
  {
    id: "accumulo",
    title: "Accumulo",
    description: "Immagazzina l'energia prodotta di giorno e utilizzala di notte. Indipendenza totale.",
    features: ["Protezione dai Blackout", "Batterie al Litio compatte", "Monitoraggio da App"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7h16v11H4V7zm18 3v5h2v-5h-2z" /></svg>,
    color: "text-emerald-500",
    aura: "bg-emerald-400/20 group-hover:bg-emerald-400/50",
    iconBg: "bg-emerald-50 border-emerald-100 shadow-inner shadow-emerald-200/50",
    loopAnim: { scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] },
    loopDuration: 3
  },
  {
    id: "pompe-calore",
    badge: "Incentivi Attivi",
    title: "Pompe di Calore",
    description: "Sostituisci la vecchia caldaia. Riscaldamento e raffrescamento 100% elettrico e green.",
    features: ["Zero emissioni in casa", "Detrazioni fiscali 65%", "Integrazione con fotovoltaico"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    color: "text-blue-500",
    aura: "bg-blue-400/20 group-hover:bg-blue-400/50",
    iconBg: "bg-blue-50 border-blue-100 shadow-inner shadow-blue-200/50",
    loopAnim: { y: [0, -4, 0] },
    loopDuration: 4
  },
  {
    id: "mobilita",
    title: "E-Mobility",
    description: "Ricarica la tua auto elettrica comodamente a casa sfruttando l'energia dei tuoi pannelli.",
    features: ["Ricarica intelligente", "Wallbox di design", "Compatibile con ogni EV"],
    icon: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    color: "text-indigo-500",
    aura: "bg-indigo-400/20 group-hover:bg-indigo-400/50",
    iconBg: "bg-indigo-50 border-indigo-100 shadow-inner shadow-indigo-200/50",
    loopAnim: { rotate: [0, 10, -5, 0], scale: [1, 1.1, 1] },
    loopDuration: 2
  }
];