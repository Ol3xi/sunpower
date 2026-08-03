"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  circuitPaths,
  heroImageSize,
  hotspots,
  type CircuitPath,
  type EnergyMode,
  type Hotspot,
} from "../../config/hero";
import { useQuoteModal } from "../ui/QuoteModalProvider";

const stars = [
  { x: 270, y: 230, radius: 8, opacity: 0.72 },
  { x: 520, y: 130, radius: 5, opacity: 0.56 },
  { x: 760, y: 270, radius: 7, opacity: 0.65 },
  { x: 1020, y: 135, radius: 6, opacity: 0.5 },
  { x: 1320, y: 210, radius: 5, opacity: 0.7 },
  { x: 1850, y: 120, radius: 7, opacity: 0.7 },
  { x: 2260, y: 210, radius: 6, opacity: 0.62 },
  { x: 2490, y: 310, radius: 8, opacity: 0.5 },
  { x: 2400, y: 110, radius: 4, opacity: 0.55 },
  { x: 1510, y: 115, radius: 4, opacity: 0.48 },
] as const;

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="4" />
      <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.2 15.6A8.5 8.5 0 0 1 8.4 3.8 8.5 8.5 0 1 0 20.2 15.6Z"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function HotspotDetailsContent({
  spot,
  titleClass,
  descriptionClass,
  titleId,
  compact,
}: {
  spot: Hotspot;
  titleClass: string;
  descriptionClass: string;
  titleId?: string;
  compact?: boolean;
}) {
  return (
    <>
      <h3
        id={titleId}
        className={classNames(
          "mb-1 text-lg font-bold",
          compact && "pr-10",
          titleClass,
        )}
      >
        {spot.title}
      </h3>
      <p className={classNames("text-sm leading-snug", descriptionClass)}>
        {spot.description}
      </p>
    </>
  );
}

function DaylightOverlay({ canAnimate }: { canAnimate: boolean }) {
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox={"0 0 " + heroImageSize.width + " " + heroImageSize.height}
      preserveAspectRatio="xMidYMid slice"
      initial={canAnimate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: canAnimate ? 0.45 : 0, ease: "easeOut" }}
    >
      <defs>
        <filter id="hero-sun-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
        <linearGradient id="hero-sun-ray" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.36" />
          <stop offset="100%" stopColor="#fef3c7" stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <motion.g
        initial={canAnimate ? { opacity: 0.2 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: canAnimate ? 0.8 : 0, ease: "easeOut" }}
      >
        <circle
          cx="2050"
          cy="190"
          r="84"
          fill="#f59e0b"
          filter="url(#hero-sun-glow)"
          opacity="0.28"
        />
        <circle cx="2050" cy="190" r="33" fill="#fef3c7" opacity="0.95" />
        <circle cx="2050" cy="190" r="24" fill="#fbbf24" opacity="0.82" />

        <path
          d="M 1980 238 C 1790 250, 1500 258, 1090 330"
          fill="none"
          filter="url(#hero-sun-glow)"
          stroke="url(#hero-sun-ray)"
          strokeLinecap="round"
          strokeWidth="44"
        />
        <path
          d="M 1990 230 C 1810 280, 1560 340, 1220 430"
          fill="none"
          filter="url(#hero-sun-glow)"
          stroke="url(#hero-sun-ray)"
          strokeLinecap="round"
          strokeWidth="34"
        />
        <path
          d="M 1980 255 C 1840 330, 1660 425, 1520 530"
          fill="none"
          filter="url(#hero-sun-glow)"
          stroke="url(#hero-sun-ray)"
          strokeLinecap="round"
          strokeWidth="28"
        />
        <path
          d="M 1980 238 C 1790 250, 1500 258, 1090 330"
          fill="none"
          stroke="#fef3c7"
          strokeLinecap="round"
          strokeOpacity="0.3"
          strokeWidth="8"
        />
        <path
          d="M 1990 230 C 1810 280, 1560 340, 1220 430"
          fill="none"
          stroke="#fef3c7"
          strokeLinecap="round"
          strokeOpacity="0.2"
          strokeWidth="6"
        />
        <path
          d="M 1980 255 C 1840 330, 1660 425, 1520 530"
          fill="none"
          stroke="#fef3c7"
          strokeLinecap="round"
          strokeOpacity="0.18"
          strokeWidth="5"
        />
      </motion.g>
    </motion.svg>
  );
}

function NightOverlay({ canAnimate }: { canAnimate: boolean }) {
  return (
    <motion.svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
      viewBox={"0 0 " + heroImageSize.width + " " + heroImageSize.height}
      preserveAspectRatio="xMidYMid slice"
      initial={canAnimate ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: canAnimate ? 0.75 : 0, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="hero-night-veil" x1="0" x2="0.85" y1="0" y2="1">
          <stop offset="0%" stopColor="#0f2a4d" stopOpacity="0.78" />
          <stop offset="52%" stopColor="#10223e" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.68" />
        </linearGradient>
        <filter id="hero-moon-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      <rect
        width={heroImageSize.width}
        height={heroImageSize.height}
        fill="url(#hero-night-veil)"
      />

      <g>
        {stars.map((star, index) => (
          <motion.circle
            key={star.x}
            cx={star.x}
            cy={star.y}
            r={star.radius}
            fill="#f8fafc"
            initial={canAnimate ? { opacity: 0 } : false}
            animate={{ opacity: star.opacity }}
            transition={{
              duration: canAnimate ? 0.32 : 0,
              delay: canAnimate ? 0.18 + index * 0.045 : 0,
              ease: "easeOut",
            }}
          />
        ))}
      </g>

      <motion.g
        initial={canAnimate ? { opacity: 0, y: -18 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: canAnimate ? 0.5 : 0, delay: canAnimate ? 0.18 : 0 }}
      >
        <circle
          cx="2050"
          cy="190"
          r="96"
          fill="#bfdbfe"
          filter="url(#hero-moon-glow)"
          opacity="0.32"
        />
        <circle cx="2050" cy="190" r="56" fill="#f8fafc" opacity="0.94" />
        <circle cx="2080" cy="164" r="54" fill="#10223e" opacity="0.9" />
      </motion.g>
    </motion.svg>
  );
}

function CircuitLine({
  circuit,
  canAnimate,
}: {
  circuit: CircuitPath;
  canAnimate: boolean;
}) {
  const drawTransition = canAnimate
    ? {
        duration: 0.75,
        delay: circuit.delay,
        ease: "easeOut" as const,
      }
    : { duration: 0 };

  return (
    <g>
      <path
        d={circuit.d}
        fill="none"
        stroke="#0f172a"
        strokeLinecap="round"
        strokeOpacity="0.24"
        strokeWidth="22"
      />
      <motion.path
        d={circuit.d}
        fill="none"
        stroke={circuit.color}
        strokeLinecap="round"
        strokeOpacity="0.42"
        strokeWidth="6"
        initial={{
          opacity: canAnimate ? 0 : 0.42,
          pathLength: canAnimate ? 0 : 1,
        }}
        animate={{ opacity: 0.42, pathLength: 1 }}
        transition={drawTransition}
      />
      <motion.path
        d={circuit.d}
        fill="none"
        filter="url(#hero-energy-glow)"
        stroke={circuit.color}
        strokeDasharray="28 76"
        strokeLinecap="round"
        strokeWidth="10"
        initial={{
          opacity: canAnimate ? 0 : 0.92,
          strokeDashoffset: 104,
        }}
        animate={
          canAnimate
            ? { opacity: 0.96, strokeDashoffset: [104, 0] }
            : { opacity: 0.92, strokeDashoffset: 0 }
        }
        transition={{
          opacity: {
            duration: canAnimate ? 0.24 : 0,
            delay: canAnimate ? circuit.delay + 0.38 : 0,
          },
          strokeDashoffset: canAnimate
            ? {
                duration: 4.5,
                delay: circuit.delay + 0.62,
                repeat: Infinity,
                ease: "linear",
              }
            : { duration: 0 },
        }}
      />
    </g>
  );
}

function getCardAlignment(
  xPercent: number,
  yPercent: number,
) {
  const isTopHalf = yPercent < 50;
  const isLeftEdge = xPercent < 40;
  const isRightEdge = xPercent > 60;

  return {
    cardAlign: isLeftEdge
      ? "left-[-15px] sm:left-[-25px]"
      : isRightEdge
        ? "right-[-15px] sm:right-[-25px]"
        : "left-1/2 -translate-x-1/2",
    arrowAlign: isLeftEdge
      ? "left-[20px] sm:left-[30px]"
      : isRightEdge
        ? "right-[20px] sm:right-[30px]"
        : "left-1/2 -translate-x-1/2",
    cardVertical: isTopHalf ? "top-full mt-3" : "bottom-full mb-3",
    arrowVertical: isTopHalf
      ? "-top-2 border-t border-l"
      : "-bottom-2 border-b border-r",
  };
}

export default function Hero() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [mode, setMode] = useState<EnergyMode>("day");
  const [sceneSize, setSceneSize] = useState({ width: 0, height: 0 });
  const sceneRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isSceneInView = useInView(sceneRef, { amount: 0.35 });
  const { openQuoteModal } = useQuoteModal();

  const isDay = mode === "day";
  const canAnimate = Boolean(isSceneInView && !shouldReduceMotion);
  const activeCircuits = circuitPaths.filter((circuit) => circuit.mode === mode);
  const activeSpot = hotspots.find((spot) => spot.id === activeHotspot);

  useEffect(() => {
    const scene = sceneRef.current;

    if (!scene || typeof ResizeObserver === "undefined") {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;

      setSceneSize((previousSize) =>
        previousSize.width === width && previousSize.height === height
          ? previousSize
          : { width, height },
      );
    });

    observer.observe(scene);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeHotspot) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveHotspot(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [activeHotspot]);

  useEffect(() => {
    if (
      !activeHotspot ||
      typeof window === "undefined" ||
      !window.matchMedia("(max-width: 1023px)").matches
    ) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById("hotspot-" + activeHotspot + "-details")
        ?.scrollIntoView({
          block: "nearest",
          behavior: shouldReduceMotion ? "auto" : "smooth",
        });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeHotspot, shouldReduceMotion]);

  const getHotspotPosition = (spot: Hotspot) => {
    const fallbackX = (spot.x / heroImageSize.width) * 100;
    const fallbackY = (spot.y / heroImageSize.height) * 100;

    if (!sceneSize.width || !sceneSize.height) {
      return {
        left: fallbackX + "%",
        top: fallbackY + "%",
        xPercent: fallbackX,
        yPercent: fallbackY,
      };
    }

    const scale = Math.max(
      sceneSize.width / heroImageSize.width,
      sceneSize.height / heroImageSize.height,
    );
    const renderedWidth = heroImageSize.width * scale;
    const renderedHeight = heroImageSize.height * scale;
    const offsetX = (sceneSize.width - renderedWidth) / 2;
    const offsetY = (sceneSize.height - renderedHeight) / 2;
    const left = offsetX + spot.x * scale;
    const top = offsetY + spot.y * scale;

    return {
      left,
      top,
      xPercent: (left / sceneSize.width) * 100,
      yPercent: (top / sceneSize.height) * 100,
    };
  };

  const selectMode = (nextMode: EnergyMode) => {
    setMode(nextMode);
    setActiveHotspot(null);
  };

  const textClassTitle = isDay ? "text-slate-950" : "text-white";
  const textClassDescription = isDay ? "text-slate-600" : "text-slate-300";
  const cardBackground = isDay ? "bg-white/95" : "bg-slate-900/95";
  const cardText = isDay ? "text-slate-900" : "text-white";
  const cardDescription = isDay ? "text-slate-600" : "text-slate-300";

  return (
    <section
      id="top"
      className={classNames(
        "relative flex min-h-[90svh] items-center overflow-hidden transition-colors duration-700 motion-reduce:transition-none",
        isDay ? "bg-slate-50" : "bg-slate-950",
      )}
    >
      <AnimatePresence initial={false}>
        {!isDay && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/45 via-slate-950/0 to-slate-950/0"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.7,
              ease: "easeInOut",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-7 lg:col-span-5">
            <div className="space-y-5">
              <p
                className={classNames(
                  "text-sm font-bold uppercase tracking-[0.18em]",
                  isDay ? "text-emerald-700" : "text-emerald-300",
                )}
              >
                Energia pensata per la tua casa
              </p>
              <h1
                className={classNames(
                  "text-4xl font-extrabold leading-[1.08] tracking-tight transition-colors duration-700 motion-reduce:transition-none sm:text-5xl xl:text-6xl",
                  textClassTitle,
                )}
              >
                L&apos;energia che non <br />
                <span className="text-emerald-500">dorme mai.</span>
              </h1>
              <p
                className={classNames(
                  "max-w-lg text-lg leading-relaxed transition-colors duration-700 motion-reduce:transition-none",
                  textClassDescription,
                )}
              >
                Scopri come pannelli, accumulo e casa lavorano insieme durante il
                giorno e la notte.
              </p>
            </div>

            <p
              aria-live="polite"
              className={classNames(
                "flex max-w-lg items-start gap-3 text-sm font-medium leading-relaxed",
                isDay ? "text-slate-600" : "text-slate-300",
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                  isDay ? "bg-amber-400" : "bg-sky-400",
                )}
              />
              {isDay
                ? "Giorno: l'energia dei pannelli alimenta la casa e carica l'accumulo."
                : "Notte: l'energia dell'accumulo continua ad alimentare la casa."}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={openQuoteModal}
                className="rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all hover:-translate-y-1 hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700 motion-reduce:transform-none"
              >
                Richiedi Preventivo
              </button>
            </div>
          </div>

          <div className="relative lg:col-span-7">
            <div
              className={classNames(
                "relative w-full overflow-visible rounded-[32px] border bg-slate-100 shadow-[0_28px_70px_-38px_rgba(15,23,42,0.45)] transition-colors duration-700 motion-reduce:transition-none",
                isDay ? "border-slate-300/90" : "border-slate-700/90",
              )}
            >
              <div className="relative">
                <div
                  ref={sceneRef}
                  className={classNames(
                    "relative aspect-[4/3] overflow-hidden md:aspect-[16/10]",
                    activeSpot
                      ? "rounded-t-[31px] rounded-b-none lg:rounded-[31px]"
                      : "rounded-[31px]",
                  )}
                >
                <Image
                  src="/interactive-house.png"
                  alt="Abitazione con pannelli fotovoltaici, inverter e sistema di accumulo"
                  fill
                  className="object-cover"
                  preload
                  sizes="(max-width: 1023px) 100vw, 58vw"
                />

                <AnimatePresence initial={false} mode="wait">
                  {isDay ? (
                    <DaylightOverlay key="daylight" canAnimate={canAnimate} />
                  ) : (
                    <NightOverlay key="night" canAnimate={canAnimate} />
                  )}
                </AnimatePresence>

                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 h-full w-full"
                  viewBox={"0 0 " + heroImageSize.width + " " + heroImageSize.height}
                  preserveAspectRatio="xMidYMid slice"
                >
                  <defs>
                    <filter
                      id="hero-energy-glow"
                      x="-40%"
                      y="-40%"
                      width="180%"
                      height="180%"
                    >
                      <feGaussianBlur stdDeviation="9" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <AnimatePresence initial={false} mode="wait">
                    <motion.g
                      key={mode}
                      initial={canAnimate ? { opacity: 0 } : false}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: canAnimate ? 0.22 : 0,
                        ease: "easeOut",
                      }}
                    >
                      {activeCircuits.map((circuit) => (
                        <CircuitLine
                          key={circuit.id}
                          circuit={circuit}
                          canAnimate={canAnimate}
                        />
                      ))}
                    </motion.g>
                  </AnimatePresence>
                </svg>

                <div
                  className={classNames(
                    "absolute left-2 top-4 z-50 rounded-2xl border p-1.5 shadow-lg backdrop-blur-md sm:left-4",
                    isDay
                      ? "border-white/80 bg-white/85 text-slate-700 shadow-slate-900/10"
                      : "border-white/15 bg-slate-950/65 text-slate-100 shadow-slate-950/30",
                  )}
                >
                  <span className="hidden px-3 pb-1.5 pt-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] sm:block">
                    Simula il flusso
                  </span>
                  <div
                    aria-label="Momento della giornata"
                    className="flex items-center gap-1"
                    role="group"
                  >
                    <button
                      type="button"
                      aria-pressed={isDay}
                      onClick={() => selectMode("day")}
                      aria-label="Mostra il flusso diurno"
                      className={classNames(
                        "flex h-11 w-11 items-center justify-center rounded-xl p-0 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:h-10 sm:w-auto sm:gap-2 sm:px-3 sm:py-2",
                        isDay
                          ? "bg-amber-100 text-amber-800 shadow-sm"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800",
                      )}
                      >
                        <SunIcon />
                        <span className="hidden sm:inline">Giorno</span>
                    </button>
                    <button
                      type="button"
                      aria-pressed={!isDay}
                      onClick={() => selectMode("night")}
                      aria-label="Mostra il flusso notturno"
                      className={classNames(
                        "flex h-11 w-11 items-center justify-center rounded-xl p-0 text-sm font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 sm:h-10 sm:w-auto sm:gap-2 sm:px-3 sm:py-2",
                        !isDay
                          ? "bg-sky-500 text-white shadow-sm"
                          : "text-slate-500 hover:bg-slate-100 hover:text-slate-800",
                      )}
                      >
                        <MoonIcon />
                        <span className="hidden sm:inline">Notte</span>
                    </button>
                  </div>
                </div>

                <div
                  className={classNames(
                    "pointer-events-none absolute bottom-4 left-4 z-20 rounded-full border px-3 py-2 text-xs font-bold shadow-sm backdrop-blur-md",
                    isDay
                      ? "border-white/80 bg-white/80 text-slate-700"
                      : "border-white/15 bg-slate-950/60 text-slate-100",
                  )}
                >
                  {isDay
                    ? "Pannelli → casa e accumulo"
                    : "Accumulo → casa"}
                </div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-30">
                  {hotspots.map((spot) => {
                  const position = getHotspotPosition(spot);
                  const alignment = getCardAlignment(
                    position.xPercent,
                    position.yPercent,
                  );
                  const isActive = activeHotspot === spot.id;
                  const hotspotStyle: CSSProperties = {
                    top: position.top,
                    left: position.left,
                  };

                  return (
                    <div
                      key={spot.id}
                      className={classNames(
                        "pointer-events-auto absolute",
                        isActive ? "z-40" : "z-20",
                      )}
                      style={hotspotStyle}
                    >
                      <button
                        type="button"
                        aria-expanded={isActive}
                        aria-label={
                          (isActive ? "Nascondi" : "Mostra") +
                          " dettagli: " +
                          spot.title
                        }
                        className="group relative -translate-x-1/2 -translate-y-1/2 rounded-full p-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500"
                        onClick={() =>
                          setActiveHotspot((currentHotspot) =>
                            currentHotspot === spot.id ? null : spot.id,
                          )
                        }
                      >
                        {isActive && (
                          <motion.span
                            aria-hidden="true"
                            className={classNames(
                              "absolute inset-2 rounded-full",
                              isDay ? "bg-amber-400/60" : "bg-sky-400/60",
                            )}
                            initial={canAnimate ? { opacity: 0.8, scale: 0.7 } : false}
                            animate={{ opacity: 0, scale: 1.8 }}
                            transition={{ duration: canAnimate ? 0.7 : 0 }}
                          />
                        )}
                        <span
                          aria-hidden="true"
                          className={classNames(
                            "relative block h-5 w-5 rounded-full border-2 border-white shadow-lg transition-colors duration-300",
                            isActive
                              ? isDay
                                ? "bg-amber-500"
                                : "bg-sky-500"
                              : "bg-white group-hover:bg-emerald-300",
                          )}
                        />
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            id={"hotspot-" + spot.id + "-popover"}
                            initial={
                              shouldReduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: position.yPercent < 50 ? -10 : 10,
                                    scale: 0.96,
                                  }
                            }
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={
                              shouldReduceMotion
                                ? { opacity: 0 }
                                : {
                                    opacity: 0,
                                    y: position.yPercent < 50 ? -10 : 10,
                                    scale: 0.96,
                                  }
                            }
                            transition={
                              shouldReduceMotion
                                ? { duration: 0 }
                                : { type: "spring", bounce: 0.2, duration: 0.35 }
                            }
                            className={classNames(
                              "absolute hidden w-[220px] rounded-2xl border border-white/20 p-4 shadow-xl backdrop-blur-xl lg:block lg:w-64",
                              alignment.cardVertical,
                              alignment.cardAlign,
                              cardBackground,
                            )}
                          >
                            <HotspotDetailsContent
                              spot={spot}
                              titleClass={cardText}
                              descriptionClass={cardDescription}
                            />
                            <div
                              aria-hidden="true"
                              className={classNames(
                                "absolute h-4 w-4 rotate-45 border-white/20",
                                alignment.arrowVertical,
                                alignment.arrowAlign,
                                cardBackground,
                              )}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                  })}
                </div>
              </div>

              <AnimatePresence initial={false} mode="wait">
                {activeSpot && (
                  <motion.div
                    key={activeSpot.id}
                    id={"hotspot-" + activeSpot.id + "-details"}
                    role="region"
                    aria-labelledby={"hotspot-" + activeSpot.id + "-details-title"}
                    aria-live="polite"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: -8 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: -8 }
                    }
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { duration: 0.22, ease: "easeOut" }
                    }
                    className={classNames(
                      "relative scroll-mb-4 rounded-b-[31px] border-t px-5 py-5 lg:hidden",
                      isDay
                        ? "border-slate-200 bg-white text-slate-900"
                        : "border-slate-700 bg-slate-900 text-white",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(null)}
                      aria-label="Chiudi dettagli"
                      className={classNames(
                        "absolute right-3 top-3 rounded-lg p-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2",
                        isDay
                          ? "text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-emerald-600"
                          : "text-slate-300 hover:bg-white/10 hover:text-white focus-visible:outline-emerald-300",
                      )}
                    >
                      <CloseIcon />
                    </button>
                    <HotspotDetailsContent
                      spot={activeSpot}
                      titleId={"hotspot-" + activeSpot.id + "-details-title"}
                      titleClass={cardText}
                      descriptionClass={cardDescription}
                      compact
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
