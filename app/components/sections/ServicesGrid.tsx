"use client";

import { motion, Variants } from "framer-motion";
import { services } from "../../config/services"; 

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    // AGGIUNGI as const SUBITO DOPO "spring"
    transition: { type: "spring" as const, stiffness: 90, damping: 15 } 
  }
};

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-slate-50" id="servizi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intestazione Sezione */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">
            I Nostri Servizi
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Energia intelligente per il tuo futuro
          </h3>
          <p className="text-lg text-slate-600">
            Dall'analisi preliminare all'installazione, offriamo un ecosistema integrato per rendere la tua casa 100% green.
          </p>
        </motion.div>

        {/* Griglia Servizi */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div 
              key={service.id}
              variants={cardVariants}
              // AGGIUNTO: active:scale-[0.98] per dare il feedback tattile alla pressione del dito su mobile!
              className="group relative bg-white rounded-[32px] p-8 sm:p-10 border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden flex flex-col h-full lg:hover:-translate-y-2 active:scale-[0.98] cursor-pointer"
            >
              
              {/* Texture di Sfondo */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] bg-[length:16px_16px]" />

              {/* Aura Luminosa */}
              <div className={`absolute top-0 right-0 w-[250px] h-[250px] rounded-full blur-[70px] -mr-16 -mt-16 transition-colors duration-700 pointer-events-none ${service.aura}`} />

              {/* Icona */}
              <div className="mb-8 relative z-10">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${service.iconBg} ${service.color} transition-transform duration-500 lg:group-hover:scale-110`}>
                  <motion.div
                    animate={service.loopAnim}
                    transition={{ duration: service.loopDuration, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {service.icon}
                  </motion.div>
                </div>
              </div>

              {/* Badge Tipografico (Eyebrow) */}
              {service.badge && (
                <div className="relative z-10 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest ${service.color} bg-white border border-slate-100 shadow-sm`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {service.badge}
                  </span>
                </div>
              )}

              {/* Contenuto Testuale */}
              <h4 className="relative z-10 text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">
                {service.title}
              </h4>
              <p className="relative z-10 text-slate-600 leading-relaxed mb-6">
                {service.description}
              </p>
              
              {/* Lista Vantaggi */}
              <ul className="relative z-10 space-y-3 flex-grow mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-700 font-medium">
                    <svg className={`w-5 h-5 mr-2 flex-shrink-0 ${service.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* NUOVA CTA: MOBILE-FIRST */}
              <div className="relative z-10 mt-auto pt-2 flex items-center justify-between">
                
                {/* Testo scuro su mobile, grigio che si scurisce su desktop */}
                <span className="font-bold text-sm text-slate-900 lg:text-slate-500 transition-colors duration-500 lg:group-hover:text-slate-900">
                  Scopri i dettagli
                </span>
                
                {/* Bottone: su mobile è NERO e RUOTATO di base. Su Desktop (lg:) torna bianco e statico, reagendo solo all'hover */}
                <div className="w-11 h-11 rounded-full bg-slate-900 lg:bg-slate-50 border border-slate-900 lg:border-slate-200 flex items-center justify-center transition-all duration-500 lg:group-hover:bg-slate-900 lg:group-hover:border-slate-900 lg:group-hover:shadow-xl lg:group-hover:shadow-slate-900/20 lg:group-hover:scale-110">
                  
                  {/* Freccia: su mobile è BIANCA e RUOTATA in alto a destra di base */}
                  <svg className="w-5 h-5 text-white lg:text-slate-400 lg:group-hover:text-white transform -rotate-45 lg:rotate-0 lg:group-hover:-rotate-45 transition-all duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}