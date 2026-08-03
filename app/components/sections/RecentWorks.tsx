"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { featuredWork, recentWorks } from "../../config/works";
import { useQuoteModal } from "../ui/QuoteModalProvider";

function ArrowUpRight() {
  return (
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
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 flex-none text-emerald-700"
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
  );
}

export default function RecentWorks() {
  const { openQuoteModal } = useQuoteModal();
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section
        id="realizzazioni"
        aria-labelledby="recent-works-title"
        className="relative overflow-hidden bg-slate-50 py-24"
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:radial-gradient(#0f172a_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="pointer-events-none absolute -right-44 top-32 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Installazioni su misura
              </p>
              <h2
                id="recent-works-title"
                className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              >
                Ogni casa merita un sistema che lavori al suo ritmo.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-relaxed text-slate-600 lg:col-span-5 lg:pb-1">
              Esplora alcune configurazioni indicative: ogni impianto viene
              progettato attorno alle abitudini, agli spazi e agli obiettivi di
              chi lo abita.
            </p>
          </div>

          <motion.article
            whileHover={shouldReduceMotion ? undefined : { y: -4 }}
            transition={{ type: "spring", stiffness: 250, damping: 24 }}
            className="group relative mb-8 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-sm shadow-slate-200/70 lg:grid lg:grid-cols-12"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 lg:col-span-7 lg:aspect-auto lg:min-h-[540px]">
              <Image
                src={featuredWork.image}
                alt={featuredWork.imageAlt}
                fill
                sizes="(max-width: 1023px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 ease-out motion-reduce:transform-none lg:group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/0 to-transparent" />
              <span className="absolute bottom-5 left-5 inline-flex rounded-full border border-white/20 bg-slate-950/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                Visualizzazione illustrativa
              </span>
            </div>

            <div className="relative flex min-w-0 flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />
              <div className="relative">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">
                  {featuredWork.category}
                </p>
                <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  {featuredWork.title}
                </h3>
                <p className="mt-5 leading-relaxed text-slate-600">
                  {featuredWork.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {featuredWork.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700"
                    >
                      <Check />
                      {service}
                    </li>
                  ))}
                </ul>

                <dl className="mt-8 grid grid-cols-3 divide-x divide-slate-200 border-y border-slate-200 py-5">
                  {featuredWork.metrics.map((metric) => (
                    <div key={metric.label} className="min-w-0 px-3 first:pl-0 last:pr-0">
                      <dd className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                        {metric.value}
                      </dd>
                      <dt className="mt-1 text-xs font-medium leading-snug text-slate-500">
                        {metric.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={openQuoteModal}
                  className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 lg:group-hover:-translate-y-0.5 motion-reduce:transform-none"
                >
                  Progettiamo la tua soluzione
                  <ArrowUpRight />
                </button>
              </div>
            </div>
          </motion.article>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {recentWorks.map((work) => (
              <motion.article
                key={work.id}
                whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                transition={{ type: "spring", stiffness: 250, damping: 24 }}
                className="group flex min-w-0 flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white shadow-sm shadow-slate-200/70"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                  <Image
                    src={work.image}
                    alt={work.imageAlt}
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out motion-reduce:transform-none lg:group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-slate-950/50 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-slate-950/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                    Esempio
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                    {work.category}
                  </p>
                  <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                    {work.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {work.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {work.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>

                  <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-slate-100 pt-5">
                    {work.metrics.map((metric) => (
                      <div key={metric.label} className="min-w-0">
                        <dd className="text-base font-extrabold text-slate-900">
                          {metric.value}
                        </dd>
                        <dt className="mt-1 text-xs leading-snug text-slate-500">
                          {metric.label}
                        </dt>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[28px] border border-emerald-100 bg-emerald-50/70 p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900">
                Vediamo cosa può fare l&apos;energia per casa tua.
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">
                Inizia con un&apos;analisi gratuita e ricevi una proposta costruita
                sui tuoi consumi.
              </p>
            </div>
            <button
              type="button"
              onClick={openQuoteModal}
              className="inline-flex min-h-12 shrink-0 items-center gap-3 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-900/10 transition-all hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              Richiedi un preventivo
              <ArrowUpRight />
            </button>
          </div>

          <p className="mt-5 text-xs leading-relaxed text-slate-500">
            Le immagini mostrano configurazioni illustrative. Potenza,
            dotazioni e risultati vengono definiti dopo il sopralluogo.
          </p>
        </div>
      </section>

    </>
  );
}
