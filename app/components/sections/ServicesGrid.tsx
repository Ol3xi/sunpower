"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { services, type ServiceItem } from "../../config/services";
import ServiceDetailsModal from "../ui/ServiceDetailsModal";
import { useContactModal } from "../ui/ContactModalProvider";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 15 },
  },
};

export default function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );
  const { openContactModal } = useContactModal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section
        id="servizi"
        aria-labelledby="services-title"
        className="bg-slate-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-emerald-700">
              I nostri servizi
            </p>
            <h2
              id="services-title"
              className="mb-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl"
            >
              Energia intelligente per il tuo futuro
            </h2>
            <p className="text-lg text-slate-600">
              Dall&apos;analisi preliminare all&apos;installazione, offriamo un
              ecosistema integrato per rendere la tua casa più efficiente.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {services.map((service) => (
              <motion.article
                key={service.id}
                variants={cardVariants}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[32px] border border-slate-200/60 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-slate-200/50 lg:hover:-translate-y-2 sm:p-10"
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(circle_at_center,_#000_1px,_transparent_1px)] [background-size:16px_16px]" />
                <div
                  aria-hidden="true"
                  style={{ backgroundImage: service.aura }}
                  className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 opacity-90 transition-opacity duration-500 lg:group-hover:opacity-100"
                />

                <div className="relative z-10 mb-8">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-transform duration-500 motion-reduce:transform-none lg:group-hover:scale-110 ${service.iconBg} ${service.color}`}
                  >
                    <motion.div
                      animate={shouldReduceMotion ? undefined : service.loopAnim}
                      transition={{
                        duration: service.loopDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {service.icon}
                    </motion.div>
                  </div>
                </div>

                {service.badge && (
                  <div className="relative z-10 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-100 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-widest shadow-sm ${service.color}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current motion-safe:animate-pulse" />
                      {service.badge}
                    </span>
                  </div>
                )}

                <h3 className="relative z-10 mb-3 text-2xl font-extrabold tracking-tight text-slate-900">
                  {service.title}
                </h3>
                <p className="relative z-10 mb-6 leading-relaxed text-slate-600">
                  {service.description}
                </p>

                <ul className="relative z-10 mb-8 flex-grow space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-sm font-medium text-slate-700"
                    >
                      <svg
                        aria-hidden="true"
                        className={`mr-2 h-5 w-5 flex-shrink-0 ${service.color}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="m5 13 4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setSelectedService(service)}
                  className="relative z-10 mt-auto flex min-h-12 w-full items-center justify-between rounded-xl text-left font-bold text-slate-900 transition-transform duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                >
                  <span className="text-sm transition-colors duration-300 lg:text-slate-500 lg:group-hover:text-slate-900">
                    Scopri i dettagli
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-900 bg-slate-900 text-white transition-all duration-500 lg:border-slate-200 lg:bg-slate-50 lg:text-slate-400 lg:group-hover:scale-110 lg:group-hover:border-slate-900 lg:group-hover:bg-slate-900 lg:group-hover:text-white">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 -rotate-45 transition-transform duration-500 lg:rotate-0 lg:group-hover:-rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </button>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onContact={openContactModal}
        />
      )}
    </>
  );
}
