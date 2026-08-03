"use client";

import { useEffect, useRef } from "react";
import type { ServiceItem } from "../../config/services";

interface ServiceDetailsModalProps {
  service: ServiceItem;
  onClose: () => void;
  onRequestQuote: () => void;
}

export default function ServiceDetailsModal({
  service,
  onClose,
  onRequestQuote,
}: ServiceDetailsModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = `service-details-${service.id}`;

  useEffect(() => {
    const dialog = dialogRef.current;

    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  const handleRequestQuote = () => {
    dialogRef.current?.close();
    window.requestAnimationFrame(onRequestQuote);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      onClose={onClose}
      className="fixed bottom-0 left-0 right-0 m-0 w-full max-w-none overflow-hidden rounded-t-[32px] border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/75 backdrop:backdrop-blur-sm sm:bottom-auto sm:left-1/2 sm:right-auto sm:top-1/2 sm:w-[calc(100%-2rem)] sm:max-w-2xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[32px]"
    >
      <div className="flex max-h-[90dvh] flex-col">
        <div className="relative overflow-y-auto p-6 sm:p-9">
          <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-300/30 blur-3xl" />

          <div className="relative">
            <div className="flex items-start justify-between gap-6">
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl border ${service.iconBg} ${service.color}`}
                >
                  {service.icon}
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                  I nostri servizi
                </p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label={`Chiudi i dettagli di ${service.title}`}
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
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
                    strokeWidth={2}
                    d="m6 6 12 12M18 6 6 18"
                  />
                </svg>
              </button>
            </div>

            <h2
              id={titleId}
              className="mt-8 max-w-xl text-3xl font-extrabold tracking-tight text-slate-900"
            >
              {service.details.heading}
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-slate-600">
              {service.details.description}
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <section className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Ideale per
                </p>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">
                  {service.details.idealFor}
                </p>
              </section>

              <section>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Cosa comprende
                </p>
                <ul className="mt-3 space-y-3">
                  {service.details.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                    >
                      <svg
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 flex-none text-emerald-700"
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
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-6">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="min-h-11 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Chiudi
          </button>
          <button
            type="button"
            onClick={handleRequestQuote}
            className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/15 transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
          >
            Richiedi un&apos;analisi gratuita
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
    </dialog>
  );
}
