"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useQuoteModal } from "../ui/QuoteModalProvider";

const navLinks = [
  { name: "Home", href: "/#top" },
  { name: "I nostri servizi", href: "/#servizi" },
  { name: "Come funziona", href: "/#come-funziona" },
  { name: "Realizzazioni", href: "/#realizzazioni" },
  { name: "Chi siamo", href: "/#chi-siamo" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openQuoteModal } = useQuoteModal();
  const shouldReduceMotion = useReducedMotion();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="sticky top-0 z-[60] h-1 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 bg-[length:200%_auto]"
      />

      <nav
        aria-label="Navigazione principale"
        className="sticky top-1 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/#top" className="group flex flex-shrink-0 items-center gap-3">
              <Image
                src="/Logo.webp"
                alt="Photonclean Systems"
                width={60}
                height={60}
                className="object-contain"
              />

              <div className="flex flex-col justify-center">
                <span className="text-base font-extrabold leading-tight tracking-[0.15em] text-[#0f284c]">
                  PHOTONCLEAN
                </span>
                <span className="text-[0.8rem] font-extrabold leading-tight tracking-[0.25em] text-[#0a192f]">
                  SYSTEMS
                </span>
              </div>
            </Link>

            <div className="hidden items-center gap-6 lg:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-md px-1 py-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex">
              <button
                type="button"
                onClick={openQuoteModal}
                className="min-h-11 rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md shadow-amber-500/20 transition-all hover:-translate-y-0.5 hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
              >
                Preventivo veloce
              </button>
            </div>

            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
                aria-controls="mobile-navigation"
                aria-expanded={isMobileMenuOpen}
                aria-label={
                  isMobileMenuOpen
                    ? "Chiudi il menu di navigazione"
                    : "Apri il menu di navigazione"
                }
                className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                <svg
                  aria-hidden="true"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m6 6 12 12M18 6 6 18"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="absolute w-full border-b border-slate-100 bg-white shadow-xl lg:hidden"
          >
            <div className="space-y-1 px-4 pb-6 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="block rounded-xl px-3 py-3 text-base font-semibold text-slate-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  {link.name}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => {
                  closeMobileMenu();
                  openQuoteModal();
                }}
                className="mt-4 block min-h-12 w-full rounded-xl bg-amber-400 px-3 py-3 text-center text-base font-bold text-slate-950 shadow-sm transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
              >
                Preventivo veloce
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
