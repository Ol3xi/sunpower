"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ServiceItem } from "../../config/services";
import { useBodyScrollLock } from "./useBodyScrollLock";

interface ServiceDetailsModalProps {
  service: ServiceItem;
  onClose: () => void;
  onContact: () => void;
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.25} d="M7 17 17 7m0 0H8m9 0v9" />
    </svg>
  );
}

export default function ServiceDetailsModal({
  service,
  onClose,
  onContact,
}: ServiceDetailsModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const titleId = `service-details-${service.id}`;

  useBodyScrollLock(true);

  useEffect(() => {
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute("disabled"));
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);

      if (!firstFocusableElement || !lastFocusableElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstFocusableElement) {
        event.preventDefault();
        lastFocusableElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
        event.preventDefault();
        firstFocusableElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [onClose]);

  const handleContact = () => {
    onClose();
    window.requestAnimationFrame(onContact);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-end overscroll-none bg-slate-950/80 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className="flex max-h-[calc(100dvh-1rem)] w-full max-w-2xl flex-col overflow-hidden rounded-t-[32px] bg-white text-slate-900 shadow-2xl sm:max-h-[90dvh] sm:rounded-[32px]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: "easeOut" }}
          onMouseDown={(event) => event.stopPropagation()}
        >
          <div
            data-modal-scroll
            className="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] px-5 py-6 sm:px-9 sm:py-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(52, 211, 153, 0.22) 0%, rgba(52, 211, 153, 0.08) 42%, transparent 72%)",
              }}
            />

            <div className="relative">
              <div className="flex items-start justify-between gap-4 sm:gap-6">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border sm:h-14 sm:w-14 ${service.iconBg} ${service.color}`}
                  >
                    {service.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                    I nostri servizi
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label={`Chiudi i dettagli di ${service.title}`}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                >
                  <CloseIcon />
                </button>
              </div>

              <h2
                id={titleId}
                className="mt-7 max-w-xl text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:mt-8 sm:text-3xl"
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
                          className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700"
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

          <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-9 sm:py-6">
            <button
              type="button"
              onClick={onClose}
              className="min-h-11 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Chiudi
            </button>
            <button
              type="button"
              onClick={handleContact}
              className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-slate-900 px-5 py-3 font-bold text-white shadow-lg shadow-slate-900/15 transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
            >
              Contattaci
              <ArrowUpRightIcon />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
