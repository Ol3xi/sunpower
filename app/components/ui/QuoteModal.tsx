"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// ==========================================
// ⚙️ CONFIGURAZIONE GLOBALE (MODIFICA QUI I DATI)
// ==========================================
const SITE_CONFIG = {
  MAKE_WEBHOOK_URL: "https://hook.eu1.make.com/sxyna8ui9c4qvp6qr6iyq6g0xupczwph",
  PHONE_NUMBER: "+393331234567",         // Numero per la chiamata mobile / copia su PC
  PHONE_DISPLAY: "+39 333 123 4567",     // Come viene mostrato graficamente all'utente
};

const InteractiveMap = dynamic(() => import("./InteractiveMap"), { 
  ssr: false, 
  loading: () => (
    <div className="h-full w-full bg-slate-900 animate-pulse flex items-center justify-center">
      <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Avvio Satellite...</span>
    </div>
  ) 
});

export default function QuoteModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [step, setStep] = useState(1); 
  const [highestStep, setHighestStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  
  const [bolletta, setBolletta] = useState("");
  const [address, setAddress] = useState("");
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [formData, setFormData] = useState({ nome: "", email: "", telefono: "", azienda_fake: "" });
  
  const [errors, setErrors] = useState({ nome: "", email: "", telefono: "" });
  
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);

      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements.at(-1);

      if (!firstFocusableElement || !lastFocusableElement) {
        event.preventDefault();
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
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [isOpen, onClose]);

  useEffect(
    () => () => {
      if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    },
    [],
  );

  const handleSelectBolletta = (valore: string) => {
    setBolletta(valore);
    setStep(2);
    setHighestStep((currentStep) => Math.max(currentStep, 2));
  };

  const handleSearchAddress = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!address.trim()) return;

    setIsSearching(true);
    try {
      const searchQuery = encodeURIComponent(address + ", Italia");
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`, {
        headers: { "Accept-Language": "it" }
      });
      const data = await response.json();

      if (data && data.length > 0) {
        setCoords([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      } else {
        alert("Indirizzo non trovato. Prova ad aggiungere la città (es: Via Etnea 10, Catania).");
      }
    } catch (error) {
      console.error("Errore di ricerca:", error);
      alert("Errore di connessione. Riprova tra poco.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleConfirmLocation = () => {
    if (scanTimeoutRef.current) clearTimeout(scanTimeoutRef.current);
    setIsScanning(true);
    scanTimeoutRef.current = setTimeout(() => {
      setIsScanning(false);
      setStep(3);
      setHighestStep((currentStep) => Math.max(currentStep, 3));
      scanTimeoutRef.current = null;
    }, 3500);
  };

  const validateForm = () => {
    const newErrors = { nome: "", email: "", telefono: "" };
    let isValid = true;

    if (!formData.nome.trim() || formData.nome.length < 2) {
      newErrors.nome = "Inserisci un nome e cognome validi.";
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Inserisci un indirizzo email valido.";
      isValid = false;
    }

    const digitsOnly = formData.telefono.replace(/\D/g, '');
    if (digitsOnly.length < 9 || digitsOnly.length > 15) {
      newErrors.telefono = "Inserisci un numero di telefono valido.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Antispam Honeypot
    if (formData.azienda_fake !== "") {
      setIsSuccess(true);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    const pacchettoDati = {
      bolletta_mensile: bolletta,
      indirizzo: address,
      nome: formData.nome,
      email: formData.email,
      telefono: formData.telefono,
      esito_stimato: "6.0 kWp" 
    };

    try {
      const response = await fetch(SITE_CONFIG.MAKE_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pacchettoDati)
      });

      if (!response.ok) throw new Error("Errore di rete");
      
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Errore durante l'invio. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm sm:p-6"
      >
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={isSuccess ? "quote-success-title" : "quote-modal-title"}
          tabIndex={-1}
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[32px] bg-white shadow-2xl"
        >
          
          {!isSuccess && (
            <div className="flex justify-between items-center p-6 border-b border-slate-100 relative z-[200] bg-white">
              <div>
                <div className="flex items-center mb-3">
                  {[1, 2, 3].map((num) => {
                    const isActive = step === num;
                    const isUnlocked = num <= highestStep;
                    return (
                      <div key={num} className="flex items-center">
                        <button onClick={() => { if (isUnlocked) setStep(num); }} disabled={!isUnlocked} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${isActive ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/40 scale-110" : isUnlocked ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 cursor-pointer" : "bg-slate-100 text-slate-400 cursor-not-allowed"}`}>
                          {num}
                        </button>
                        {num < 3 && <div className={`w-8 h-[2px] mx-1 rounded-full transition-colors ${num < highestStep ? "bg-emerald-300" : "bg-slate-100"}`} />}
                      </div>
                    );
                  })}
                </div>
                <h3 id="quote-modal-title" className="text-xl font-extrabold text-slate-900">
                  {step === 1 && "Qualifica il tuo impianto"}
                  {step === 2 && "Individua il tuo tetto"}
                  {step === 3 && "Risultato Analisi"}
                </h3>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Chiudi il preventivo"
                className="flex h-10 w-10 self-start items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          )}

          <div className="p-6 sm:p-8 overflow-y-auto flex-grow relative bg-white">
            
            {/* STEP 1 */}
            {step === 1 && !isSuccess && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full items-center justify-center py-8">
                <h4 className="text-2xl font-extrabold text-slate-900 mb-8 text-center">Quanto paghi in media di energia elettrica a bimestre?</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                  {["Meno di 100€", "Tra 100€ e 200€", "Tra 200€ e 300€", "Oltre 300€"].map((opzione) => (
                    <button key={opzione} onClick={() => handleSelectBolletta(opzione)} className={`bg-slate-50 border-2 text-slate-700 font-bold py-6 px-6 rounded-2xl transition-all shadow-sm hover:shadow-md flex flex-col items-center justify-center gap-2 ${bolletta === opzione ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 hover:border-emerald-500 hover:text-emerald-700"}`}>
                      <span className="text-lg">{opzione}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && !isSuccess && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                <form onSubmit={handleSearchAddress} className="mb-6 relative z-[200] flex gap-2">
                  <div className="relative flex-grow">
                    <svg className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <input type="text" placeholder="Es: Via Etnea 10, Catania" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-lg rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" />
                  </div>
                  <button type="submit" disabled={isSearching} className="bg-slate-900 hover:bg-slate-800 text-white px-6 rounded-2xl font-bold transition-all disabled:opacity-50">
                    {isSearching ? "Cerco..." : "Cerca"}
                  </button>
                </form>

                <div className="relative w-full h-[400px] bg-slate-900 rounded-[24px] overflow-hidden border-2 border-slate-200 shadow-inner">
                  <div className="absolute inset-0 z-10"><InteractiveMap searchCoords={coords} /></div>
                  {isScanning && <motion.div initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent to-emerald-500/50 border-b-2 border-emerald-400 z-[500] pointer-events-none" />}
                </div>

                <div className="mt-6 flex justify-end relative z-[200]">
                  <button onClick={handleConfirmLocation} disabled={isScanning} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-emerald-500/30 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-2">
                    {isScanning ? "Elaborazione in corso..." : "Conferma Tetto"}
                    {!isScanning && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && !isSuccess && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col md:flex-row gap-8 h-full">
                <div className="w-full md:w-1/2 bg-slate-50 rounded-[24px] p-6 border border-slate-200 relative overflow-hidden">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Esito Preliminare</h4>
                  <div className="space-y-4 relative z-10">
                    <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl">A+</div>
                      <div>
                        <p className="text-sm text-slate-500 font-medium">Esposizione Solare</p>
                        <p className="font-bold text-slate-900">Ottimale (Sud / Sud-Est)</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <h4 className="text-2xl font-extrabold text-slate-900 mb-2">Sblocca il report completo</h4>
                  <p className="text-slate-600 text-sm mb-6">A chi dobbiamo inviare il progetto 3D gratuito?</p>
                  
                  <form className="space-y-4" onSubmit={handleSubmitForm} noValidate>
                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <input type="text" value={formData.azienda_fake} onChange={(e) => setFormData({...formData, azienda_fake: e.target.value})} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div>
                      <input type="text" placeholder="Nome e Cognome" value={formData.nome} onChange={(e) => { setFormData({...formData, nome: e.target.value}); setErrors({...errors, nome: ""}); }} className={`w-full bg-slate-50 border text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${errors.nome ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} />
                      {errors.nome && <p className="text-red-500 text-xs mt-1 px-2">{errors.nome}</p>}
                    </div>

                    <div>
                      <input type="email" placeholder="Email" value={formData.email} onChange={(e) => { setFormData({...formData, email: e.target.value}); setErrors({...errors, email: ""}); }} className={`w-full bg-slate-50 border text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} />
                      {errors.email && <p className="text-red-500 text-xs mt-1 px-2">{errors.email}</p>}
                    </div>

                    <div>
                      <input type="tel" placeholder="Numero di Telefono" value={formData.telefono} onChange={(e) => { setFormData({...formData, telefono: e.target.value}); setErrors({...errors, telefono: ""}); }} className={`w-full bg-slate-50 border text-slate-900 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${errors.telefono ? 'border-red-400 bg-red-50' : 'border-slate-200'}`} />
                      {errors.telefono && <p className="text-red-500 text-xs mt-1 px-2">{errors.telefono}</p>}
                    </div>
                    
                    <button disabled={isSubmitting} type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg transition-colors mt-2 disabled:opacity-50 flex items-center justify-center">
                      {isSubmitting ? "Invio in corso..." : "Ricevi il Preventivo Esatto"}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* SCHERMATA DI SUCCESSO (USA LE VARIABILI DI CONFIGURAZIONE) */}
            {isSuccess && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mb-6 text-white shadow-xl shadow-emerald-500/30">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h4 id="quote-success-title" className="text-3xl font-extrabold text-slate-900 mb-2">Richiesta Inviata!</h4>
                <p className="text-slate-600 font-medium text-lg max-w-md">I nostri esperti ti contatteranno a breve. Hai fretta?</p>
                
                <div className="flex flex-col gap-4 w-full max-w-md mt-4">
                  {/* Tasto Mobile */}
                  <a href={`tel:${SITE_CONFIG.PHONE_NUMBER}`} className="sm:hidden w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg flex items-center justify-center gap-2">
                    Chiamaci Ora
                  </a>

                  {/* Tasto Desktop/Tablet */}
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(SITE_CONFIG.PHONE_NUMBER);
                      setIsCopied(true);
                      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
                      copyTimeoutRef.current = setTimeout(() => {
                        setIsCopied(false);
                        copyTimeoutRef.current = null;
                      }, 2500);
                    }}
                    className="hidden sm:flex w-full bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-500 text-emerald-800 py-3 px-4 rounded-2xl flex-col items-center justify-center gap-1 group"
                  >
                    {isCopied ? (
                      <span className="font-bold text-emerald-600 flex items-center gap-2 text-lg py-1.5">Numero Copiato!</span>
                    ) : (
                      <>
                        <span className="text-sm font-semibold text-emerald-600">Oppure chiama i nostri esperti</span>
                        <span className="text-2xl font-extrabold tracking-wider">{SITE_CONFIG.PHONE_DISPLAY}</span>
                        <span className="text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">Clicca per copiare</span>
                      </>
                    )}
                  </button>
                  
                  <button onClick={onClose} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-4 px-6 rounded-2xl transition-colors">
                    Chiudi finestra
                  </button>
                </div>
              </motion.div>
            )}

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
