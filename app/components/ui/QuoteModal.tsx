"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { siteConfig } from "../../config/site";
import type { QuoteEstimate } from "../../lib/estimate";
import {
  consumptionBandLabels,
  type ConsumptionBand,
  type Coordinates,
  type QuoteFieldErrors,
  type QuoteRequestPayload,
  validateQuoteRequest,
} from "../../lib/quote";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-slate-950 text-center text-sm font-bold uppercase tracking-[0.14em] text-emerald-300">
      Caricamento della mappa…
    </div>
  ),
});

const steps = [
  {
    number: 1,
    label: "Consumi",
    title: "Parlaci dei tuoi consumi",
    description: "Una stima della bolletta ci aiuta a preparare una proposta più utile.",
  },
  {
    number: 2,
    label: "Tetto",
    title: "Individua il tuo tetto",
    description: "Cerca l'immobile e posiziona il mirino sul tetto da analizzare.",
  },
  {
    number: 3,
    label: "Contatti",
    title: "Ricevi la tua proposta",
    description: "Riepiloghiamo la richiesta e ti ricontattiamo con il prossimo passo.",
  },
] as const;

const billOptions: Array<{
  value: ConsumptionBand;
  detail: string;
}> = [
  { value: "under-100", detail: "Consumi contenuti" },
  { value: "100-200", detail: "Fascia più comune" },
  { value: "200-300", detail: "Consumi importanti" },
  { value: "over-300", detail: "Consumi elevati" },
];

type Step = 1 | 2 | 3;

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

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

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4.5 4.5L19 7" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.25"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m15 18-6-6 6-6" />
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

function BoltIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="6" />
      <path strokeLinecap="round" d="m16 16 4 4" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path strokeLinecap="round" d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.5 5.3 5.7c-1 1-.8 3.2.6 5.8 1.6 3 3.6 5.1 6.6 6.6 2.6 1.4 4.8 1.6 5.8.6l2.2-2.2-3.3-3.3-2.2 1.6c-1.2-.6-2.3-1.7-2.9-2.9l1.6-2.2-3.2-3.2Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3 5 6v5c0 4.8 3 8.7 7 10 4-1.3 7-5.2 7-10V6l-7-3Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path strokeLinecap="round" d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-2 text-sm font-medium text-rose-700">
      {message}
    </p>
  );
}

function QuoteDesktopAside({
  currentStep,
  isSuccess,
}: {
  currentStep: Step;
  isSuccess: boolean;
}) {
  return (
    <aside className="relative hidden overflow-hidden bg-slate-950 p-6 text-white lg:flex lg:flex-col xl:p-8">
      <div className="pointer-events-none absolute -right-16 -top-14 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-amber-300/15 blur-3xl" />

      <div className="relative flex h-full flex-col">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-200">
          Photonclean Systems
        </p>
        <h2 className="mt-4 text-2xl font-extrabold tracking-tight">
          {isSuccess
            ? "La tua richiesta è in buone mani."
            : "La tua analisi, passo dopo passo."}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {isSuccess
            ? "Un consulente userà i dettagli condivisi per preparare il prossimo passo."
            : "Bastano pochi dettagli per preparare una proposta adatta alla tua casa."}
        </p>

        {!isSuccess && (
          <ol className="mt-9 space-y-5" aria-label="Avanzamento dell'analisi">
            {steps.map((item) => {
              const isCurrent = item.number === currentStep;
              const isCompleted = item.number < currentStep;

              return (
                <li key={item.number} className="flex items-center gap-3">
                  <span
                    className={classNames(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-extrabold",
                      isCurrent || isCompleted
                        ? "border-emerald-300 bg-emerald-400 text-slate-950"
                        : "border-white/10 bg-white/5 text-slate-400",
                    )}
                  >
                    {isCompleted ? <CheckIcon className="h-4 w-4" /> : item.number}
                  </span>
                  <div>
                    <p
                      className={classNames(
                        "text-sm font-bold",
                        isCurrent || isCompleted ? "text-white" : "text-slate-400",
                      )}
                    >
                      {item.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">Passo {item.number}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        )}

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-relaxed text-slate-200">
          <p className="font-bold text-white">Gratuito · Senza impegno</p>
          <p className="mt-1 text-slate-300">
            Ti rispondiamo {siteConfig.responseTime}.
          </p>
        </div>
      </div>
    </aside>
  );
}

function QuoteMobileBand({
  currentStep,
  isSuccess,
}: {
  currentStep: Step;
  isSuccess: boolean;
}) {
  return (
    <div className="shrink-0 bg-slate-950 px-5 py-5 text-white sm:px-8 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-200">
          {isSuccess ? "Richiesta inviata" : "Analisi preliminare"}
        </p>
        {!isSuccess && (
          <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-slate-200">
            Passo {currentStep} di 3
          </span>
        )}
      </div>
      {!isSuccess && (
        <div className="mt-4 flex gap-2" aria-hidden="true">
          {steps.map((item) => (
            <span
              key={item.number}
              className={classNames(
                "h-1.5 flex-1 rounded-full",
                item.number <= currentStep ? "bg-emerald-400" : "bg-white/15",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuoteModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && <QuoteModalSession key="quote-modal" onClose={onClose} />}
    </AnimatePresence>
  );
}

function QuoteModalSession({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [highestStep, setHighestStep] = useState<Step>(1);
  const [consumptionBand, setConsumptionBand] = useState<ConsumptionBand | null>(
    null,
  );
  const [address, setAddress] = useState("");
  const [resolvedAddress, setResolvedAddress] = useState("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [fieldErrors, setFieldErrors] = useState<QuoteFieldErrors>({});
  const [searchMessage, setSearchMessage] = useState("");
  const [searchError, setSearchError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null);
  const [isDemoSubmission, setIsDemoSubmission] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const successTitleRef = useRef<HTMLHeadingElement>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idempotencyKeyRef = useRef<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useBodyScrollLock(true);

  const currentStep = steps[step - 1];
  const hasConfirmedLocation = Boolean(resolvedAddress && coordinates);
  const titleId = isSuccess ? "quote-success-title" : "quote-modal-title";

  const clearFieldError = useCallback((field: keyof QuoteFieldErrors) => {
    setFieldErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
  }, []);

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
      document.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(focusFrame);
    };
  }, [onClose]);

  useEffect(() => {
    if (!isSuccess) {
      return undefined;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      successTitleRef.current?.focus();
    });

    return () => window.cancelAnimationFrame(focusFrame);
  }, [isSuccess]);

  useEffect(
    () => () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    },
    [],
  );

  const goToStep = (nextStep: Step) => {
    if (nextStep > highestStep) {
      return;
    }

    if (nextStep === 3 && !hasConfirmedLocation) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        location: "Cerca e conferma la posizione del tetto prima di continuare.",
      }));
      setStep(2);
      return;
    }

    setStep(nextStep);
  };

  const selectConsumptionBand = (nextBand: ConsumptionBand) => {
    setConsumptionBand(nextBand);
    clearFieldError("consumptionBand");
    setHighestStep((currentHighestStep) =>
      Math.max(currentHighestStep, 2) as Step,
    );
    setStep(2);
  };

  const handleAddressChange = (nextAddress: string) => {
    setAddress(nextAddress);
    setResolvedAddress("");
    setCoordinates(null);
    setSearchMessage("");
    setSearchError("");
    clearFieldError("address");
    clearFieldError("location");
  };

  const handleSearchAddress = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        address: "Inserisci l'indirizzo dell'immobile.",
      }));
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setSearchMessage("Ricerca dell'indirizzo in corso…");

    try {
      const searchQuery = encodeURIComponent(trimmedAddress + ", Italia");
      const response = await fetch(
        "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=" +
          searchQuery,
        { headers: { "Accept-Language": "it" } },
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const results = (await response.json()) as Array<{
        lat?: string;
        lon?: string;
        display_name?: string;
      }>;
      const result = results[0];
      const latitude = Number(result?.lat);
      const longitude = Number(result?.lon);

      if (!result || !Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        setSearchMessage("");
        setSearchError("Indirizzo non trovato. Prova ad aggiungere città e numero civico.");
        return;
      }

      setResolvedAddress(result.display_name ?? trimmedAddress);
      setCoordinates({ latitude, longitude });
      clearFieldError("address");
      clearFieldError("location");
      setSearchMessage("Indirizzo individuato. Ora puoi affinare il mirino sul tetto.");
    } catch {
      setSearchMessage("");
      setSearchError("Non riesco a cercare l'indirizzo in questo momento. Riprova tra poco.");
    } finally {
      setIsSearching(false);
    }
  };

  const handlePositionChange = useCallback((position: [number, number]) => {
    setCoordinates({ latitude: position[0], longitude: position[1] });
    clearFieldError("location");
  }, [clearFieldError]);

  const continueFromRoof = () => {
    if (!hasConfirmedLocation) {
      setFieldErrors((currentErrors) => ({
        ...currentErrors,
        location: "Cerca e conferma la posizione del tetto prima di continuare.",
      }));
      return;
    }

    setHighestStep(3);
    setStep(3);
  };

  const focusFirstInvalidField = (errors: QuoteFieldErrors) => {
    const fieldIds: Array<[keyof QuoteFieldErrors, string]> = [
      ["fullName", "quote-full-name"],
      ["email", "quote-email"],
      ["phone", "quote-phone"],
      ["message", "quote-message"],
      ["privacyAcknowledged", "quote-privacy"],
    ];
    const firstInvalidField = fieldIds.find(([field]) => errors[field]);

    if (firstInvalidField) {
      document.getElementById(firstInvalidField[1])?.focus();
    }
  };

  const getIdempotencyKey = () => {
    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = crypto.randomUUID();
    }

    return idempotencyKeyRef.current;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const payload: QuoteRequestPayload = {
      idempotencyKey: getIdempotencyKey(),
      consumptionBand,
      address: resolvedAddress || address,
      coordinates,
      fullName,
      email,
      phone,
      message,
      privacyAcknowledged,
      marketingConsent,
      website,
    };
    const nextErrors = validateQuoteRequest(payload);

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      focusFirstInvalidField(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseData = (await response.json().catch(() => null)) as {
        message?: string;
        fieldErrors?: QuoteFieldErrors;
        estimate?: QuoteEstimate;
        isDemoSubmission?: boolean;
      } | null;

      if (!response.ok) {
        if (responseData?.fieldErrors) {
          setFieldErrors(responseData.fieldErrors);
          focusFirstInvalidField(responseData.fieldErrors);
        }
        setSubmitError(
          responseData?.message ??
            "Non siamo riusciti a inviare la richiesta. Riprova tra poco.",
        );
        return;
      }

      setEstimate(responseData?.estimate ?? null);
      setIsDemoSubmission(Boolean(responseData?.isDemoSubmission));
      setIsSuccess(true);
    } catch {
      setSubmitError("Non siamo riusciti a inviare la richiesta. Riprova tra poco.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyPhoneNumber = async () => {
    setCopyError("");

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(siteConfig.phoneNumber);
      setIsCopied(true);

      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }

      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
        copyTimeoutRef.current = null;
      }, 2500);
    } catch {
      setCopyError("Non è stato possibile copiare il numero. Puoi annotarlo manualmente.");
    }
  };

  return (
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
            aria-describedby="quote-modal-description"
            tabIndex={-1}
            className="flex max-h-[92dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[32px] bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-[32px] lg:grid lg:h-[90dvh] lg:grid-cols-[22rem_minmax(0,1fr)] lg:grid-rows-[minmax(0,1fr)]"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.26, ease: "easeOut" }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <section className="order-1 flex min-h-0 min-w-0 flex-1 flex-col lg:h-full">
              <QuoteMobileBand currentStep={step} isSuccess={isSuccess} />

              <header className="flex shrink-0 items-start justify-between gap-5 border-b border-slate-100 bg-white px-5 py-5 sm:px-8 sm:py-6">
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700">
                    {isSuccess ? "Prossimo passo" : "Analisi per la tua casa"}
                  </p>
                  <h2
                    id={isSuccess ? undefined : titleId}
                    className="mt-2 text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl"
                  >
                    {isSuccess ? "Richiesta ricevuta" : currentStep.title}
                  </h2>
                  <p
                    id="quote-modal-description"
                    className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600"
                  >
                    {isSuccess
                      ? "Grazie: abbiamo ricevuto le informazioni necessarie per iniziare."
                      : currentStep.description}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Chiudi il preventivo"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                >
                  <CloseIcon />
                </button>
              </header>

              <div
                data-modal-scroll
                className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain touch-pan-y [-webkit-overflow-scrolling:touch] px-5 py-6 sm:px-8 sm:py-8"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSuccess ? (
                    <motion.section
                      key="success"
                      className="mx-auto flex max-w-xl flex-col items-center py-2 text-center sm:py-6"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
                    >
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 shadow-lg shadow-emerald-500/15">
                        <CheckIcon className="h-8 w-8" />
                      </div>
                      <h3
                        ref={successTitleRef}
                        id="quote-success-title"
                        tabIndex={-1}
                        className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                      >
                        {isDemoSubmission
                          ? "Simulazione completata."
                          : "La richiesta è stata inviata."}
                      </h3>
                      <p className="mt-3 max-w-lg leading-relaxed text-slate-600">
                        {isDemoSubmission
                          ? "Questa è una prova: nessun dato è stato inviato. Quando attiveremo Make, questa schermata confermerà la richiesta reale."
                          : `Un consulente analizzerà i dettagli condivisi e ti ricontatterà ${siteConfig.responseTime}.`}
                      </p>

                      {estimate && (
                        <section
                          aria-labelledby="quote-estimate-title"
                          className="mt-7 w-full rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-left shadow-sm sm:p-5"
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-700">
                                La tua pre-analisi
                              </p>
                              <h4
                                id="quote-estimate-title"
                                className="mt-1 text-xl font-extrabold tracking-tight text-slate-950"
                              >
                                Configurazione, produzione e risparmio
                              </h4>
                            </div>
                            {estimate.isDemo && (
                              <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-amber-950">
                                {estimate.label}
                              </span>
                            )}
                          </div>

                          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                            {[
                              ["Configurazione", estimate.configuration],
                              ["Produzione annua", estimate.production],
                              ["Risparmio annuo", estimate.savings],
                            ].map(([label, value]) => (
                              <div
                                key={label}
                                className="rounded-xl border border-emerald-100 bg-white/90 p-3"
                              >
                                <dt className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                                  {label}
                                </dt>
                                <dd className="mt-1 text-sm font-extrabold leading-snug text-slate-950">
                                  {value}
                                </dd>
                              </div>
                            ))}
                          </dl>
                          <p className="mt-4 text-xs leading-relaxed text-slate-600">
                            {estimate.disclaimer}
                          </p>
                        </section>
                      )}

                      <ol className="mt-8 w-full space-y-3 text-left" aria-label="Prossimi passaggi">
                        {[
                          "Richiesta ricevuta",
                          "Analisi preliminare della tua casa",
                          "Contatto del nostro team",
                        ].map((item, index) => (
                          <li
                            key={item}
                            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-extrabold text-white">
                              {index + 1}
                            </span>
                            <span className="text-sm font-bold text-slate-800">{item}</span>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-8 grid w-full gap-3 sm:grid-cols-2">
                        <a
                          href={`tel:${siteConfig.phoneNumber}`}
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 font-bold text-white shadow-lg shadow-emerald-700/20 transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                        >
                          <PhoneIcon />
                          Chiama ora
                        </a>
                        <button
                          type="button"
                          onClick={copyPhoneNumber}
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                        >
                          {isCopied ? <CheckIcon /> : <CopyIcon />}
                          {isCopied ? "Numero copiato" : siteConfig.phoneDisplay}
                        </button>
                      </div>
                      {copyError && (
                        <p role="status" className="mt-3 text-sm font-medium text-amber-800">
                          {copyError}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={onClose}
                        className="mt-5 rounded-lg px-4 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                      >
                        Torna al sito
                      </button>
                    </motion.section>
                  ) : step === 1 ? (
                    <motion.section
                      key="consumption"
                      aria-labelledby="quote-consumption-title"
                      className="mx-auto max-w-2xl"
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      <p className="text-sm font-bold text-emerald-700">I tuoi consumi</p>
                      <h3
                        id="quote-consumption-title"
                        className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
                      >
                        Quanto spendi indicativamente in bolletta ogni due mesi?
                      </h3>
                      <p className="mt-3 leading-relaxed text-slate-600">
                        Va bene anche una stima: potrai sempre approfondire con un consulente.
                      </p>

                      <fieldset className="mt-7">
                        <legend className="sr-only">Fascia di spesa bimestrale</legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {billOptions.map((option) => {
                            const isSelected = option.value === consumptionBand;

                            return (
                              <label
                                key={option.value}
                                className={classNames(
                                  "group relative flex min-h-28 cursor-pointer items-center gap-4 rounded-2xl border p-5 text-left transition-all duration-200 focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-emerald-700",
                                  isSelected
                                    ? "border-emerald-600 bg-emerald-50 shadow-[0_10px_30px_rgba(5,150,105,0.12)]"
                                    : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg",
                                )}
                              >
                                <input
                                  type="radio"
                                  name="consumption-band"
                                  value={option.value}
                                  checked={isSelected}
                                  onChange={() => selectConsumptionBand(option.value)}
                                  className="sr-only"
                                />
                                <span
                                  aria-hidden="true"
                                  className={classNames(
                                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                                    isSelected
                                      ? "bg-emerald-600 text-white"
                                      : "bg-emerald-50 text-emerald-700",
                                  )}
                                >
                                  <BoltIcon />
                                </span>
                                <span className="min-w-0">
                                  <span className="block font-extrabold text-slate-900">
                                    {consumptionBandLabels[option.value]}
                                  </span>
                                  <span className="mt-1 block text-sm text-slate-500">
                                    {option.detail}
                                  </span>
                                </span>
                                {isSelected && (
                                  <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                                    <CheckIcon className="h-3.5 w-3.5" />
                                  </span>
                                )}
                              </label>
                            );
                          })}
                        </div>
                      </fieldset>
                      <FieldError
                        id="quote-consumption-error"
                        message={fieldErrors.consumptionBand}
                      />
                    </motion.section>
                  ) : step === 2 ? (
                    <motion.section
                      key="roof"
                      aria-labelledby="quote-roof-title"
                      className="mx-auto max-w-3xl"
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-emerald-700">Il tuo tetto</p>
                          <h3
                            id="quote-roof-title"
                            className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
                          >
                            Cerca l&apos;indirizzo dell&apos;immobile
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => goToStep(1)}
                          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                        >
                          <ArrowLeftIcon />
                          Indietro
                        </button>
                      </div>

                      <form onSubmit={handleSearchAddress} className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <div>
                          <label
                            htmlFor="quote-address"
                            className="mb-2 block text-sm font-bold text-slate-700"
                          >
                            Indirizzo dell&apos;immobile
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                              <SearchIcon />
                            </span>
                            <input
                              id="quote-address"
                              type="text"
                              value={address}
                              onChange={(event) => handleAddressChange(event.target.value)}
                              placeholder="Es. Via Etnea 10, Catania"
                              autoComplete="street-address"
                              aria-invalid={Boolean(fieldErrors.address)}
                              aria-describedby={
                                fieldErrors.address ? "quote-address-error" : undefined
                              }
                              className={classNames(
                                "min-h-12 w-full rounded-xl border bg-slate-50 py-3 pl-12 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                                fieldErrors.address
                                  ? "border-rose-400 bg-rose-50"
                                  : "border-slate-200",
                              )}
                            />
                          </div>
                          <FieldError
                            id="quote-address-error"
                            message={fieldErrors.address}
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSearching}
                          className="min-h-12 self-end rounded-xl bg-slate-950 px-5 py-3 font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:cursor-wait disabled:opacity-60"
                        >
                          {isSearching ? "Ricerca…" : "Cerca indirizzo"}
                        </button>
                      </form>

                      <div
                        className="isolate relative mt-5 h-60 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 shadow-inner sm:h-72"
                        aria-label="Selezione del tetto sulla mappa"
                      >
                        {coordinates ? (
                          <InteractiveMap
                            searchCoords={[coordinates.latitude, coordinates.longitude]}
                            onPositionChange={handlePositionChange}
                          />
                        ) : (
                          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-emerald-300">
                              <PinIcon />
                            </span>
                            <p className="mt-4 font-extrabold text-slate-900">
                              Cerca un indirizzo per visualizzare il tetto
                            </p>
                            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600">
                              Potrai spostare il mirino per indicare con precisione l&apos;area da analizzare.
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {hasConfirmedLocation ? (
                          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                            <CheckIcon className="h-4 w-4 shrink-0" />
                            <span className="truncate">{resolvedAddress}</span>
                          </span>
                        ) : (
                          <p className="text-sm leading-relaxed text-slate-500">
                            Cerca l&apos;indirizzo per continuare. Il mirino è facoltativo ma utile per essere più precisi.
                          </p>
                        )}
                      </div>
                      {searchMessage && (
                        <p role="status" className="mt-3 text-sm font-medium text-emerald-800">
                          {searchMessage}
                        </p>
                      )}
                      {searchError && (
                        <p role="alert" className="mt-3 text-sm font-medium text-rose-700">
                          {searchError}
                        </p>
                      )}
                      <FieldError
                        id="quote-location-error"
                        message={fieldErrors.location}
                      />

                      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs leading-relaxed text-slate-500">
                          L&apos;indirizzo viene usato solo per preparare la richiesta preliminare.
                        </p>
                        <button
                          type="button"
                          onClick={continueFromRoof}
                          disabled={!hasConfirmedLocation}
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 py-3 font-bold text-white shadow-lg shadow-emerald-700/20 transition-colors hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                        >
                          Analizza questo tetto
                          <ArrowRightIcon />
                        </button>
                      </div>
                    </motion.section>
                  ) : (
                    <motion.section
                      key="contact"
                      aria-labelledby="quote-contact-title"
                      className="mx-auto max-w-2xl"
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -12 }}
                      transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                    >
                      <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold text-emerald-700">Ultimo passo</p>
                          <h3
                            id="quote-contact-title"
                            className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl"
                          >
                            Dove possiamo inviarti la proposta?
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => goToStep(2)}
                          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700"
                        >
                          <ArrowLeftIcon />
                          Indietro
                        </button>
                      </div>

                      <section className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5" aria-labelledby="quote-summary-title">
                        <p
                          id="quote-summary-title"
                          className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800"
                        >
                          Riepilogo della richiesta
                        </p>
                        <dl className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                          <div>
                            <dt className="font-medium text-emerald-900/70">Bolletta bimestrale</dt>
                            <dd className="mt-1 font-bold text-slate-900">
                              {consumptionBand ? consumptionBandLabels[consumptionBand] : "Da definire"}
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-emerald-900/70">Immobile</dt>
                            <dd className="mt-1 truncate font-bold text-slate-900" title={resolvedAddress}>
                              {resolvedAddress || "Da definire"}
                            </dd>
                          </div>
                        </dl>
                      </section>

                      <form className="mt-7 space-y-5" noValidate onSubmit={handleSubmit}>
                        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                          <label htmlFor="quote-website">Sito web</label>
                          <input
                            id="quote-website"
                            type="text"
                            value={website}
                            onChange={(event) => setWebsite(event.target.value)}
                            tabIndex={-1}
                            autoComplete="off"
                          />
                        </div>

                        <div>
                          <label htmlFor="quote-full-name" className="mb-2 block text-sm font-bold text-slate-700">
                            Nome e cognome
                          </label>
                          <div className="relative">
                            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                              <UserIcon />
                            </span>
                            <input
                              id="quote-full-name"
                              type="text"
                              value={fullName}
                              onChange={(event) => {
                                setFullName(event.target.value);
                                clearFieldError("fullName");
                              }}
                              autoComplete="name"
                              aria-invalid={Boolean(fieldErrors.fullName)}
                              aria-describedby={
                                fieldErrors.fullName ? "quote-full-name-error" : undefined
                              }
                              className={classNames(
                                "min-h-12 w-full rounded-xl border bg-slate-50 py-3 pl-12 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                                fieldErrors.fullName
                                  ? "border-rose-400 bg-rose-50"
                                  : "border-slate-200",
                              )}
                            />
                          </div>
                          <FieldError id="quote-full-name-error" message={fieldErrors.fullName} />
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                          <div>
                            <label htmlFor="quote-email" className="mb-2 block text-sm font-bold text-slate-700">
                              Email
                            </label>
                            <div className="relative">
                              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <MailIcon />
                              </span>
                              <input
                                id="quote-email"
                                type="email"
                                value={email}
                                onChange={(event) => {
                                  setEmail(event.target.value);
                                  clearFieldError("email");
                                }}
                                autoComplete="email"
                                inputMode="email"
                                aria-invalid={Boolean(fieldErrors.email)}
                                aria-describedby={fieldErrors.email ? "quote-email-error" : undefined}
                                className={classNames(
                                  "min-h-12 w-full rounded-xl border bg-slate-50 py-3 pl-12 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                                  fieldErrors.email
                                    ? "border-rose-400 bg-rose-50"
                                    : "border-slate-200",
                                )}
                              />
                            </div>
                            <FieldError id="quote-email-error" message={fieldErrors.email} />
                          </div>

                          <div>
                            <label htmlFor="quote-phone" className="mb-2 block text-sm font-bold text-slate-700">
                              Numero di telefono
                            </label>
                            <div className="relative">
                              <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <PhoneIcon />
                              </span>
                              <input
                                id="quote-phone"
                                type="tel"
                                value={phone}
                                onChange={(event) => {
                                  setPhone(event.target.value);
                                  clearFieldError("phone");
                                }}
                                autoComplete="tel"
                                inputMode="tel"
                                aria-invalid={Boolean(fieldErrors.phone)}
                                aria-describedby={fieldErrors.phone ? "quote-phone-error" : undefined}
                                className={classNames(
                                  "min-h-12 w-full rounded-xl border bg-slate-50 py-3 pl-12 pr-4 text-slate-950 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                                  fieldErrors.phone
                                    ? "border-rose-400 bg-rose-50"
                                    : "border-slate-200",
                                )}
                              />
                            </div>
                            <FieldError id="quote-phone-error" message={fieldErrors.phone} />
                          </div>
                        </div>

                        <div>
                          <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                            <label htmlFor="quote-message" className="text-sm font-bold text-slate-700">
                              C&apos;è qualcosa che vuoi dirci prima di sentirci?
                            </label>
                            <span className="text-xs font-medium text-slate-500">Facoltativo</span>
                          </div>
                          <textarea
                            id="quote-message"
                            value={message}
                            onChange={(event) => {
                              setMessage(event.target.value);
                              clearFieldError("message");
                            }}
                            maxLength={1200}
                            rows={4}
                            placeholder="Es. Vorrei valutare anche l'accumulo, ho una pompa di calore…"
                            aria-invalid={Boolean(fieldErrors.message)}
                            aria-describedby={
                              fieldErrors.message
                                ? "quote-message-hint quote-message-error"
                                : "quote-message-hint"
                            }
                            className={classNames(
                              "min-h-28 w-full resize-y rounded-xl border bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20",
                              fieldErrors.message
                                ? "border-rose-400 bg-rose-50"
                                : "border-slate-200",
                            )}
                          />
                          <div className="mt-2 flex items-start justify-between gap-4">
                            <FieldError id="quote-message-error" message={fieldErrors.message} />
                            <span
                              id="quote-message-hint"
                              className="shrink-0 text-xs font-medium tabular-nums text-slate-500"
                            >
                              {message.length}/1.200
                            </span>
                          </div>
                        </div>

                        <fieldset
                          className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                          aria-describedby={
                            fieldErrors.privacyAcknowledged ? "quote-privacy-error" : undefined
                          }
                        >
                          <legend className="px-1 text-sm font-extrabold text-slate-800">
                            Privacy e comunicazioni
                          </legend>
                          <div className="mt-2 flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                            <input
                              id="quote-privacy"
                              type="checkbox"
                              checked={privacyAcknowledged}
                              onChange={(event) => {
                                setPrivacyAcknowledged(event.target.checked);
                                clearFieldError("privacyAcknowledged");
                              }}
                              aria-invalid={Boolean(fieldErrors.privacyAcknowledged)}
                              aria-describedby={
                                fieldErrors.privacyAcknowledged
                                  ? "quote-privacy-error"
                                  : undefined
                              }
                              className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                            />
                            <span>
                              <label htmlFor="quote-privacy" className="cursor-pointer">
                              Ho letto l&apos;
                              </label>
                              <a
                                href={siteConfig.privacyPath}
                                target="_blank"
                                rel="noreferrer"
                                className="font-bold text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:text-emerald-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                              >
                                Informativa Privacy<span className="sr-only"> (si apre in una nuova scheda)</span>
                              </a>
                              {" "}
                              <label htmlFor="quote-privacy" className="cursor-pointer">
                                e prendo atto del trattamento dei miei dati per gestire la richiesta di preventivo.
                              </label>
                            </span>
                          </div>
                          <FieldError
                            id="quote-privacy-error"
                            message={fieldErrors.privacyAcknowledged}
                          />

                          <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
                            <input
                              type="checkbox"
                              checked={marketingConsent}
                              onChange={(event) => setMarketingConsent(event.target.checked)}
                              className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                            />
                            <span>
                              Desidero ricevere aggiornamenti e offerte di Photonclean Systems via email o telefono.
                              <span className="ml-1 font-medium text-slate-500">Facoltativo.</span>
                            </span>
                          </label>
                        </fieldset>

                        {submitError && (
                          <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-800">
                            {submitError}
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-xl bg-emerald-700 px-5 py-3 text-lg font-extrabold text-white shadow-lg shadow-emerald-700/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 disabled:cursor-wait disabled:opacity-60 motion-reduce:transform-none"
                        >
                          {isSubmitting ? "Invio in corso…" : "Ricevi la mia proposta"}
                          {!isSubmitting && <ArrowRightIcon />}
                        </button>
                        <p className="flex items-center justify-center gap-2 text-center text-xs leading-relaxed text-slate-500">
                          <ShieldIcon />
                          Gratuito · Senza impegno · Ti rispondiamo {siteConfig.responseTime}
                        </p>
                      </form>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </section>

            <QuoteDesktopAside currentStep={step} isSuccess={isSuccess} />
          </motion.div>
        </motion.div>
  );
}
