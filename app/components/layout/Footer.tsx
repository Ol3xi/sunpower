"use client";

import Image from "next/image";
import Link from "next/link";
import { useContactModal } from "../ui/ContactModalProvider";

const navigationLinks = [
  { name: "Home", href: "/#top" },
  { name: "Servizi", href: "/#servizi" },
  { name: "Come funziona", href: "/#come-funziona" },
  { name: "Realizzazioni", href: "/#realizzazioni" },
  { name: "Chi siamo", href: "/#chi-siamo" },
  { name: "FAQ", href: "/#faq" },
];

export default function Footer() {
  const { openContactModal } = useContactModal();

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(16,185,129,0.18),transparent_22%),radial-gradient(circle_at_10%_100%,rgba(245,158,11,0.12),transparent_25%)]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Link
              href="/#top"
              className="inline-flex items-center gap-3 rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
            >
              <Image
                src="/Logo.webp"
                alt="Photonnclean Systems"
                width={58}
                height={58}
                className="rounded-xl bg-white object-contain p-1"
              />
              <div className="flex flex-col">
                <span className="text-base font-extrabold leading-tight tracking-[0.15em] text-white">
                  PHOTOCLEAN
                </span>
                <span className="text-[0.8rem] font-extrabold leading-tight tracking-[0.25em] text-slate-300">
                  SYSTEMS
                </span>
              </div>
            </Link>

            <h2 className="mt-9 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              La scelta giusta parte da una buona domanda.
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
              Raccontaci la tua casa, i tuoi consumi e quello che vorresti
              migliorare: costruiamo insieme il punto di partenza.
            </p>
            <button
              type="button"
              onClick={openContactModal}
              className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-xl bg-amber-300 px-5 py-3 font-bold text-slate-950 shadow-lg shadow-amber-500/10 transition-all hover:-translate-y-0.5 hover:bg-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-200"
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

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-5 lg:pt-3">
            <nav aria-label="Navigazione a piè di pagina">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                Esplora
              </p>
              <ul className="mt-5 space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="rounded-md text-sm font-semibold text-slate-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                Il tuo progetto
              </p>
              <p className="mt-5 text-sm leading-relaxed text-slate-300">
                Dal primo confronto alla proposta su misura, ogni passaggio
                parte dalle esigenze della tua casa.
              </p>
              <button
                type="button"
                onClick={openContactModal}
                className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:border-emerald-200/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
              >
                Contattaci
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
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
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© Photonclean Systems. Tutti i diritti riservati.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
{/*             <Link
              href="/privacy"
              className="rounded-md font-semibold text-slate-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
            >
              Privacy
            </Link> */}
            <Link
              href="/#top"
              className="inline-flex w-fit items-center gap-2 rounded-md font-semibold text-slate-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-200"
            >
              Torna all&apos;inizio
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.25}
                  d="m5 11 7-7 7 7M12 4v16"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
