// --- TIPI TYPESCRIPT ---
export interface Hotspot {
  id: string;
  top: number;
  left: number;
  title: string;
  description: string;
}

export interface CircuitPath {
  id: string;
  d: string;        // Coordinate SVG della linea
  color: string;
  isDayOnly?: boolean;
  isNightOnly?: boolean;
  reverse?: boolean;
}

// --- DATI HOTSPOTS ---
export const hotspots: Hotspot[] = [
  {
    id: "pannelli",
    top: 20,
    left: 35,
    title: "Pannelli Fotovoltaici",
    description: "Generano energia pura dai raggi solari. Attivi dall'alba al tramonto."
  },
  {
    id: "inverter",
    top: 45,
    left: 60,
    title: "Inverter Ibrido",
    description: "Il 'cervello'. Converte l'energia e decide se inviarla in casa o in batteria."
  },
  {
    id: "batteria",
    top: 70,
    left: 25,
    title: "Accumulo (Batterie)",
    description: "Conserva l'eccesso di energia diurna per alimentare la casa di notte."
  },
  {
    id: "casa",
    top: 75,
    left: 75,
    title: "Utenze Domestiche",
    description: "Frigorifero, luci, condizionatore. Alimentati al 100% da energia verde."
  }
];

// --- DATI CIRCUITI (SVG) ---
export const circuitPaths: CircuitPath[] = [
  // Circuiti diurni
  // Usiamo Colori Esadecimali brillanti: Giallo/Arancio (#f59e0b) e Verde Smeraldo (#10b981)
  { id: "pan-inv", d: "M 35 20 L 60 20 L 60 45", color: "#f59e0b", isDayOnly: true },
  { id: "inv-bat", d: "M 60 45 L 60 70 L 25 70", color: "#10b981", isDayOnly: true },
  { id: "inv-casa", d: "M 60 45 L 75 45 L 75 75", color: "#f59e0b", isDayOnly: true },
  
  // Circuiti notturni
  // Azzurro brillante (#3b82f6)
  { id: "bat-inv-night", d: "M 25 70 L 60 70 L 60 45", color: "#3b82f6", isNightOnly: true, reverse: true },
  { id: "inv-casa-night", d: "M 60 45 L 75 45 L 75 75", color: "#3b82f6", isNightOnly: true }
];