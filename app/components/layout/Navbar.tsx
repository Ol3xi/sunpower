"use client"; // Necessario perché usiamo useState per il menu mobile

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import QuoteModal from "../ui/QuoteModal";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Elenco dei link per evitare di ripetere codice
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "I Nostri Servizi", href: "/servizi" },
    { name: "Come Funziona", href: "/processo" },
    { name: "Chi Siamo", href: "/chi-siamo" },
  ];

  return (
    <>
      {/* Linea superiore animata (Flusso di Energia) */}
      <motion.div
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="h-1 w-full bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500 sticky top-0 z-[60] bg-[length:200%_auto]"
      />

      {/* Navbar principale con effetto "Vetro" (Glassmorphism) */}
      <nav className="sticky top-1 z-50 w-full backdrop-blur-xl bg-white/80 border-b border-slate-200/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Aziendale */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {/* Sostituisci questo div con il tuo logo <Image /> futuro */}
              <div className="w-8 h-8 rounded bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-md shadow-emerald-500/20 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/80 rounded-sm" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-800">
                Sun<span className="text-emerald-600">Power</span>
              </span>
            </div>

            {/* Link Desktop */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-slate-600 hover:text-emerald-600 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Call to Action Desktop */}
            <div className="hidden md:flex">
              <Link
                onClick={() => setIsModalOpen(true)}
                href=""
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all shadow-md shadow-amber-500/20 hover:-translate-y-0.5"
              >
                Preventivo Veloce
              </Link>
            </div>

            {/* Pulsante Menu Mobile (Hamburger) */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-emerald-600 focus:outline-none p-2"
              >
                <svg
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
                      d="M6 18L18 6M6 6l12 12"
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

        {/* Menu Mobile a comparsa */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 shadow-xl absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)} // Chiude il menu al clic
                  className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/preventivo"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mt-4 text-center px-3 py-3 text-base font-medium text-white bg-amber-500 rounded-md shadow-sm"
              >
                Preventivo Veloce
              </Link>
            </div>
          </div>
        )}
      </nav>
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
