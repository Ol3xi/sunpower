"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import QuoteModal from "./QuoteModal";

interface QuoteModalContextValue {
  openQuoteModal: () => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openQuoteModal = useCallback(() => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = null;
    }

    const activeElement = document.activeElement;
    triggerRef.current =
      activeElement instanceof HTMLElement ? activeElement : null;
    setIsQuoteModalOpen(true);
  }, []);

  const closeQuoteModal = useCallback(() => {
    setIsQuoteModalOpen(false);

    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }

    focusTimeoutRef.current = setTimeout(() => {
      if (triggerRef.current?.isConnected) {
        triggerRef.current.focus();
      }
      focusTimeoutRef.current = null;
    }, 240);
  }, []);

  useEffect(
    () => () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({ openQuoteModal, closeQuoteModal }),
    [closeQuoteModal, openQuoteModal],
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);

  if (!context) {
    throw new Error("useQuoteModal must be used within QuoteModalProvider.");
  }

  return context;
}
