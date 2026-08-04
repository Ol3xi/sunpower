"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../../config/site";
import { useBodyScrollLock } from "./useBodyScrollLock";

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function PhoneIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 3.5 5.3 5.7c-1 1-.8 3.2.6 5.8 1.6 3 3.6 5.1 6.6 6.6 2.6 1.4 4.8 1.6 5.8.6l2.2-2.2-3.3-3.3-2.2 1.6c-1.2-.6-2.3-1.7-2.9-2.9l1.6-2.2-3.2-3.2Z"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.25"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

export default function ContactModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const titleId = "contact-modal-title";

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

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
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end overscroll-none bg-slate-950/80 p-0 backdrop-blur-sm sm:items-center sm:justify-center sm:p-6"
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
            aria-describedby="contact-modal-description"
            tabIndex={-1}
            className="flex max-h-[calc(100dvh-1rem)] w-full max-w-4xl flex-col overflow-hidden rounded-t-[32px] bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-[32px] lg:grid lg:grid-cols-[19rem_minmax(0,1fr)]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <aside className="relative hidden overflow-hidden bg-slate-950 p-8 text-white lg:flex lg:flex-col">
              <div className="pointer-events-none absolute -right-16 -top-12 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-amber-300/15 blur-3xl" />
              <div className="relative flex h-full flex-col">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                  Photonclean Systems
                </p>
                <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
                  Parliamone direttamente.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  Per capire le esigenze della tua casa e darti maggiori dettagli,
                  preferiamo sentirci al telefono.
                </p>
                <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-200">
                  <p className="font-bold text-white">Nessun modulo da compilare</p>
                  <p className="mt-1 text-slate-300">Ti basta una chiamata per iniziare.</p>
                </div>
              </div>
            </aside>

            <section
              data-modal-scroll
              className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] bg-white"
            >
              <div className="bg-slate-950 px-5 py-4 text-white lg:hidden">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
                  Photonclean Systems
                </p>
              </div>

              <header className="flex items-start justify-between gap-5 border-b border-slate-100 px-5 py-5 sm:px-8 sm:py-6">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                    Maggiori dettagli
                  </p>
                  <h2
                    id={titleId}
                    className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
                  >
                    Contattaci
                  </h2>
                  <p
                    id="contact-modal-description"
                    className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600"
                  >
                    Chiamaci per parlare del tuo progetto e ricevere tutte le informazioni che ti servono.
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Chiudi la finestra di contatto"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                >
                  <CloseIcon />
                </button>
              </header>

              <div className="px-5 py-7 sm:px-8 sm:py-9">
                <motion.div
                  className="mx-auto max-w-xl"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.22, delay: 0.06 }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-500/15">
                    <PhoneIcon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-950">
                    Il nostro numero
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    Siamo a disposizione per chiarire dubbi, raccontarti come lavoriamo e capire se possiamo esserti utili.
                  </p>

                  <a
                    href={`tel:${siteConfig.phoneNumber}`}
                    className="group mt-7 flex items-center justify-between gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 motion-reduce:transform-none sm:p-6"
                  >
                    <span>
                      <span className="block text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-800">
                        Telefono
                      </span>
                      <span className="mt-2 block text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                        {siteConfig.phoneDisplay}
                      </span>
                    </span>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-white shadow-lg shadow-emerald-700/20 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                      <ArrowRightIcon />
                    </span>
                  </a>

                  <a
                    href={`tel:${siteConfig.phoneNumber}`}
                    className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-xl bg-slate-950 px-5 py-3 font-bold text-white shadow-lg shadow-slate-950/15 transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                  >
                    <PhoneIcon className="h-5 w-5" />
                    Chiama ora
                  </a>
                </motion.div>
              </div>
            </section>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
