"use client";

import { useContactModal } from "../ui/ContactModalProvider";

const pillars = [
  {
    title: "Partiamo dalle persone",
    description:
      "Consumi, abitudini, spazi e priorità: il progetto prende forma da qui.",
    icon: "spark",
  },
  {
    title: "Rendiamo tutto comprensibile",
    description:
      "Scelte tecniche, attività e preventivo: ogni passaggio ha un perché.",
    icon: "message",
  },
  {
    title: "Pensiamo al sistema intero",
    description:
      "Fotovoltaico, accumulo, comfort e mobilità vengono valutati insieme.",
    icon: "grid",
  },
] as const;

function PillarIcon({ icon }: { icon: (typeof pillars)[number]["icon"] }) {
  const commonProps = {
    "aria-hidden": true,
    className: "h-5 w-5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
  } as const;

  if (icon === "spark") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.9}
          d="m12 3-1.6 5.4L5 10l5.4 1.6L12 17l1.6-5.4L19 10l-5.4-1.6L12 3Zm6 12-.7 2.3L15 18l2.3.7L18 21l.7-2.3L21 18l-2.3-.7L18 15ZM6 15l-.7 2.3L3 18l2.3.7L6 21l.7-2.3L9 18l-2.3-.7L6 15Z"
        />
      </svg>
    );
  }

  if (icon === "message") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.9}
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.7 9.7 0 0 1-4.33-1.01L3 20l1.21-3.63A7.48 7.48 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
        />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.9}
        d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"
      />
    </svg>
  );
}

export default function About() {
  const { openContactModal } = useContactModal();

  return (
    <section
      id="chi-siamo"
      aria-labelledby="about-title"
      className="relative overflow-hidden bg-white py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%-2rem,80rem)] -translate-x-1/2 bg-slate-200" />
      <div className="pointer-events-none absolute -left-48 bottom-0 h-96 w-96 rounded-full bg-emerald-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Chi siamo
            </p>
            <h2
              id="about-title"
              className="max-w-3xl text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
            >
              Ogni progetto parte dall&apos;ascolto.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Photonclean Systems unisce tecnologia e attenzione al contesto per
              accompagnarti nella scelta di un sistema energetico più
              consapevole, adatto alla tua casa e al tuo modo di viverla.
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">
              Per noi un impianto non è una somma di componenti: è un percorso
              fatto di domande chiare, decisioni ragionate e soluzioni che
              lavorano insieme nel tempo.
            </p>

            <button
              type="button"
              onClick={openContactModal}
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              Contattaci
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

          <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-slate-950 p-7 text-white shadow-2xl shadow-slate-200/70 sm:p-9 lg:col-span-5">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-amber-300/15 blur-3xl" />

            <div className="relative">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                  Il nostro approccio
                </p>
                <span className="text-3xl font-black tracking-[-0.14em] text-white/15" aria-hidden="true">
                  PCS
                </span>
              </div>

              <p className="mt-7 text-2xl font-extrabold tracking-tight text-white">
                Tecnologia che ha senso nella vita di tutti i giorni.
              </p>
              <p className="mt-3 leading-relaxed text-slate-300">
                L&apos;obiettivo è rendere semplice una decisione importante,
                senza perdere di vista quello che conta davvero per te.
              </p>

              <dl className="mt-8 space-y-5">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="flex gap-4">
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl border border-emerald-200/15 bg-emerald-300/10 text-emerald-200">
                      <PillarIcon icon={pillar.icon} />
                    </div>
                    <div>
                      <dt className="font-bold text-white">{pillar.title}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-slate-300">
                        {pillar.description}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
