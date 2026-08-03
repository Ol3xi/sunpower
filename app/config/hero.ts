export type EnergyMode = "day" | "night";

export const heroImageSize = {
  width: 2816,
  height: 1536,
} as const;

export interface Hotspot {
  id: string;
  x: number;
  y: number;
  title: string;
  description: string;
}

export interface CircuitPath {
  id: string;
  d: string;
  color: string;
  mode: EnergyMode;
  delay: number;
}

export const hotspots: Hotspot[] = [
  {
    id: "pannelli",
    x: 1050,
    y: 300,
    title: "Pannelli fotovoltaici",
    description:
      "Catturano la luce del sole e la trasformano in energia per la casa.",
  },
  {
    id: "inverter",
    x: 1645,
    y: 700,
    title: "Inverter ibrido",
    description:
      "Coordina l'energia prodotta, quella accumulata e quella richiesta dalla casa.",
  },
  {
    id: "batteria",
    x: 800,
    y: 1050,
    title: "Sistema di accumulo",
    description:
      "Conserva l'energia non utilizzata subito, pronta per la sera e la notte.",
  },
  {
    id: "casa",
    x: 2125,
    y: 1100,
    title: "Utenze domestiche",
    description:
      "Luci, cucina, comfort e dispositivi di casa ricevono energia quando serve.",
  },
];

export const circuitPaths: CircuitPath[] = [
  {
    id: "pannelli-inverter",
    d: "M 1050 300 C 1180 274, 1410 312, 1534 420 C 1605 482, 1614 590, 1645 700",
    color: "#f59e0b",
    mode: "day",
    delay: 0,
  },
  {
    id: "inverter-casa",
    d: "M 1645 700 C 1654 780, 1725 865, 1800 900 C 1910 960, 2030 1015, 2125 1100",
    color: "#10b981",
    mode: "day",
    delay: 0.28,
  },
  {
    id: "inverter-accumulo",
    d: "M 1645 700 C 1640 800, 1560 850, 1480 866 C 1260 898, 1030 873, 905 920 C 842 945, 812 1005, 800 1050",
    color: "#10b981",
    mode: "day",
    delay: 0.52,
  },
  {
    id: "accumulo-inverter",
    d: "M 800 1050 C 812 1005, 842 945, 905 920 C 1030 873, 1260 898, 1480 866 C 1560 850, 1640 800, 1645 700",
    color: "#38bdf8",
    mode: "night",
    delay: 0,
  },
  {
    id: "inverter-casa-notte",
    d: "M 1645 700 C 1654 780, 1725 865, 1800 900 C 1910 960, 2030 1015, 2125 1100",
    color: "#38bdf8",
    mode: "night",
    delay: 0.32,
  },
];
