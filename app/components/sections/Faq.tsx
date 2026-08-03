import { faqItems } from "../../config/faq";

export default function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(100%-2rem,80rem)] -translate-x-1/2 bg-slate-200" />
      <div className="pointer-events-none absolute -right-48 top-20 h-96 w-96 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Domande frequenti
          </p>
          <h2
            id="faq-title"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            Tutto quello che vuoi chiarire, prima di scegliere.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            Ogni casa è diversa. Qui trovi alcune risposte utili per iniziare a
            orientarti.
          </p>
        </div>

        <div className="mt-12 space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-slate-200/80 bg-white px-5 shadow-sm transition-colors open:border-emerald-200 open:shadow-md sm:px-6"
            >
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-left font-bold text-slate-900 [&::-webkit-details-marker]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">
                <span>{item.question}</span>
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-transform duration-300 group-open:rotate-45 group-open:bg-emerald-100 group-open:text-emerald-800">
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeWidth={2.25} d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-100 pb-5 pt-4">
                <p className="max-w-3xl leading-relaxed text-slate-600">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <p className="mt-8 text-center text-sm leading-relaxed text-slate-500">
          Non trovi qui la tua domanda? Durante l&apos;analisi iniziale possiamo
          valutare il tuo caso specifico.
        </p>
      </div>
    </section>
  );
}
