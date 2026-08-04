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
import ContactModal from "./ContactModal";

interface ContactModalContextValue {
  openContactModal: () => void;
  closeContactModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextValue | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const focusTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openContactModal = useCallback(() => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
      focusTimeoutRef.current = null;
    }

    const activeElement = document.activeElement;
    triggerRef.current =
      activeElement instanceof HTMLElement ? activeElement : null;
    setIsContactModalOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsContactModalOpen(false);

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
    () => ({ openContactModal, closeContactModal }),
    [closeContactModal, openContactModal],
  );

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);

  if (!context) {
    throw new Error("useContactModal must be used within ContactModalProvider.");
  }

  return context;
}
