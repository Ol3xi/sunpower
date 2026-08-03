"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processSteps, type ProcessIcon } from "../../config/process";
import { useQuoteModal } from "../ui/QuoteModalProvider";

function StepIcon({ icon }: { icon: ProcessIcon }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
  } as const;

  if (icon === "chat") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.7 9.7 0 0 1-4.33-1.01L3 20l1.21-3.63A7.48 7.48 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
        />
      </svg>
    );
  }

  if (icon === "home") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6"
        />
      </svg>
    );
  }

  if (icon === "blueprint") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M4 4h16v16H4zM8 4v4m8-4v4M8 16h8m-8-4h8"
        />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="m12 3-1.6 5.4L5 10l5.4 1.6L12 17l1.6-5.4L19 10l-5.4-1.6L12 3Zm6 12-.7 2.3L15 18l2.3.7L18 21l.7-2.3L21 18l-2.3-.7L18 15ZM6 15l-.7 2.3L3 18l2.3.7L6 21l.7-2.3L9 18l-2.3-.7L6 15Z"
      />
    </svg>
  );
}

export default function HowItWorks() {
  const { openQuoteModal } = useQuoteModal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="come-funziona"
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-slate-950 py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_85%_80%,rgba(245,158,11,0.14),transparent_25%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
              Un percorso chiaro
            </p>
            <h2
              id="process-title"
              className="max-w-3xl text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Dalla prima idea all&apos;energia che usi ogni giorno.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-slate-300 lg:col-span-5 lg:pb-1">
            Ti accompagniamo passo dopo passo: ascoltiamo le tue esigenze,
            progettiamo la soluzione e restiamo presenti anche dopo
            l&apos;installazione.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-12 hidden h-px bg-gradient-to-r from-emerald-400/0 via-emerald-300/80 to-amber-300/0 xl:block" />

          <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {processSteps.map((step) => (
              <li key={step.number} className="relative">
                <motion.article
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.07] p-7 shadow-xl shadow-slate-950/10 backdrop-blur-sm"
                >
                  <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl transition-colors duration-500 group-hover:bg-emerald-300/20" />

                  <div className="relative flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-200/20 bg-emerald-300/10 text-emerald-200">
                      <StepIcon icon={step.icon} />
                    </div>
                    <span className="text-3xl font-extrabold tracking-tight text-white/25" aria-hidden="true">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-xl font-extrabold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-slate-300">
                    {step.description}
                  </p>
                  <p className="relative mt-6 border-t border-white/10 pt-4 text-xs font-semibold leading-relaxed text-emerald-100">
                    {step.detail}
                  </p>
                </motion.article>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 rounded-[28px] border border-white/10 bg-white/[0.07] p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-white">
              Pronto a capire quale soluzione è adatta a te?
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300">
              Raccontaci come usi l&apos;energia oggi: da lì costruiamo il
              progetto giusto.
            </p>
          </div>
          <button
            type="button"
            onClick={openQuoteModal}
            className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/10 transition-all hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
          >
            Inizia la tua analisi gratuita
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.25}
                d="M7 17 17 7m0 0H8m9 0v9"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
