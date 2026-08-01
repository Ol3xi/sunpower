"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
// Importiamo i dati dal nostro nuovo file di configurazione
import { hotspots, circuitPaths } from '../../config/hero';

// Componente SVG interno
const CircuitLine = ({ d, color, reverse = false }: { d: string, color: string, reverse?: boolean }) => (
  <>
    <path d={d} stroke="rgba(148, 163, 184, 0.2)" strokeWidth="0.4" fill="none" />
    <motion.path
      d={d} stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="2 6"
      initial={{ strokeDashoffset: reverse ? 0 : 8 }}
      animate={{ strokeDashoffset: reverse ? 8 : 0 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
    />
  </>
);

export default function Hero() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isDay, setIsDay] = useState<boolean>(true);

  const bgClass = isDay ? 'bg-slate-50' : 'bg-slate-900';
  const textClassTitle = isDay ? 'text-slate-900' : 'text-white';
  const textClassDesc = isDay ? 'text-slate-600' : 'text-slate-300';
  const cardBg = isDay ? 'bg-white/95' : 'bg-slate-800/95';
  const cardText = isDay ? 'text-slate-800' : 'text-white';
  const cardDesc = isDay ? 'text-slate-600' : 'text-slate-300';

  // Filtriamo i circuiti attivi in base al giorno o alla notte
  const activeCircuits = circuitPaths.filter(c => isDay ? !c.isNightOnly : !c.isDayOnly);

  return (
    <section className={`relative overflow-hidden min-h-[90vh] flex items-center transition-colors duration-1000 ${bgClass}`}>
      
      <AnimatePresence>
        {!isDay && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
            className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900/0 to-slate-900/0"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* COLONNA TESTO */}
          <div className="lg:col-span-5 space-y-8">
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1] transition-colors duration-1000 ${textClassTitle}`}>
              L'energia che non <br />
              <span className="text-emerald-500">dorme mai.</span>
            </h1>
            <p className={`text-lg max-w-lg leading-relaxed transition-colors duration-1000 ${textClassDesc}`}>
              Scopri come il nostro sistema gestisce i flussi di energia in tempo reale. Clicca sui componenti per i dettagli o cambia momento della giornata.
            </p>

            <div className="inline-flex items-center p-1 bg-slate-200 dark:bg-slate-700 rounded-full shadow-inner">
              <button onClick={() => setIsDay(true)} className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${isDay ? 'bg-white text-amber-500 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                ☀️ Giorno
              </button>
              <button onClick={() => setIsDay(false)} className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${!isDay ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>
                🌙 Notte
              </button>
            </div>
            
            <div className="pt-4">
              <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1">
                Richiedi Preventivo
              </button>
            </div>
          </div>

{/* COLONNA IMMAGINE INTERATTIVA */}
          <div className="lg:col-span-7 relative">
            {/* Contenitore Principale (Senza overflow-hidden per permettere alle card di uscire) */}
            <div className="relative aspect-[4/3] md:aspect-[16/10] w-full rounded-3xl shadow-2xl border border-slate-700/20 bg-slate-200">
              
              {/* WRAPPER INTERNO PER IMMAGINE E CIRCUITI (Questo taglia gli angoli) */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl z-0">
                <Image 
                  src="/interactive-house.png" 
                  alt="Schema impianto fotovoltaico"
                  fill
                  className="object-cover"
                  priority
                  onClick={() => setActiveHotspot(null)}
                />

                <div className={`absolute inset-0 bg-blue-950/60 mix-blend-multiply transition-opacity duration-1000 pointer-events-none ${isDay ? 'opacity-0' : 'opacity-100'}`} />

                {/* RENDER CIRCUITI DINAMICI */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none">
                  {activeCircuits.map(circuit => (
                    <CircuitLine key={circuit.id} d={circuit.d} color={circuit.color} reverse={circuit.reverse} />
                  ))}
                </svg>
              </div>

              {/* RENDER HOTSPOTS DINAMICI (Z-10 per stare sopra l'immagine) */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                {hotspots.map((spot) => {
                  const isTopHalf = spot.top < 50;
                  
                  // Logica anti-taglio laterale per Mobile
                  const isLeftEdge = spot.left < 45;
                  const isRightEdge = spot.left > 55;

                  // Se il pallino è attivo, lo portiamo in primissimo piano (z-40) per coprire gli altri
                  const isActive = activeHotspot === spot.id;
                  const zIndexClass = isActive ? 'z-40' : 'z-20';

                  // Allineamento Card
                  let cardAlign = "left-1/2 -translate-x-1/2"; // Default centrato
                  let arrowAlign = "left-1/2 -translate-x-1/2";
                  
                  if (isLeftEdge) {
                    cardAlign = "left-[-15px] sm:left-[-25px]";
                    arrowAlign = "left-[20px] sm:left-[30px]";
                  } else if (isRightEdge) {
                    cardAlign = "right-[-15px] sm:right-[-25px]";
                    arrowAlign = "right-[20px] sm:right-[30px]";
                  }

                  // Allineamento Verticale
                  const cardVertical = isTopHalf ? 'top-full mt-3' : 'bottom-full mb-3';
                  const arrowVertical = isTopHalf ? '-top-2 border-t border-l' : '-bottom-2 border-b border-r';

                  return (
                    <div key={spot.id} className={`absolute ${zIndexClass} pointer-events-auto`} style={{ top: `${spot.top}%`, left: `${spot.left}%` }}>
                      
                      <div className="relative -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-2" onClick={() => setActiveHotspot(isActive ? null : spot.id)}>
                        <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity }} className={`absolute inset-2 rounded-full ${isDay ? 'bg-amber-400' : 'bg-blue-400'}`} />
                        <div className={`relative w-5 h-5 rounded-full border-2 border-white shadow-lg transition-colors duration-300 ${isActive ? (isDay ? 'bg-amber-500' : 'bg-blue-500') : 'bg-white group-hover:bg-emerald-400'}`} />
                      </div>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: isTopHalf ? -10 : 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: isTopHalf ? -10 : 10, scale: 0.95 }}
                            transition={{ type: "spring", bounce: 0.3 }}
                            // Larghezza leggermente ridotta su mobile (w-[220px]) per sicurezza
                            className={`absolute ${cardVertical} ${cardAlign} w-[220px] sm:w-64 p-4 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 ${cardBg}`}
                          >
                            <h3 className={`font-bold text-lg mb-1 ${cardText}`}>{spot.title}</h3>
                            <p className={`text-sm leading-snug ${cardDesc}`}>{spot.description}</p>
                            <div className={`absolute ${arrowVertical} ${arrowAlign} w-4 h-4 transform rotate-45 border-white/20 ${cardBg}`} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}