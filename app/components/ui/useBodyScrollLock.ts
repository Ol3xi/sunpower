"use client";

import { useEffect } from "react";

let activeLocks = 0;
let lockedScrollY = 0;
let originalStyles:
  | {
      bodyLeft: string;
      bodyOverflow: string;
      bodyOverscrollBehavior: string;
      bodyPaddingRight: string;
      bodyPosition: string;
      bodyRight: string;
      bodyTop: string;
      bodyWidth: string;
      rootOverflow: string;
      rootOverscrollBehavior: string;
      rootScrollBehavior: string;
    }
  | undefined;

function getScrollArea(target: EventTarget | null) {
  const element =
    target instanceof Element
      ? target
      : target instanceof Node
        ? target.parentElement
        : null;

  return element?.closest<HTMLElement>("[data-modal-scroll]");
}

/**
 * Locks the document behind a modal, including on iOS where body overflow
 * alone still allows the page beneath a scrollable sheet to move.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) {
      return undefined;
    }

    const body = document.body;
    const root = document.documentElement;

    if (activeLocks === 0) {
      lockedScrollY = window.scrollY;
      originalStyles = {
        bodyLeft: body.style.left,
        bodyOverflow: body.style.overflow,
        bodyOverscrollBehavior: body.style.overscrollBehavior,
        bodyPaddingRight: body.style.paddingRight,
        bodyPosition: body.style.position,
        bodyRight: body.style.right,
        bodyTop: body.style.top,
        bodyWidth: body.style.width,
        rootOverflow: root.style.overflow,
        rootOverscrollBehavior: root.style.overscrollBehavior,
        rootScrollBehavior: root.style.scrollBehavior,
      };

      const scrollbarWidth = window.innerWidth - root.clientWidth;

      root.style.overflow = "hidden";
      root.style.overscrollBehavior = "none";
      root.style.scrollBehavior = "auto";

      body.style.position = "fixed";
      body.style.top = `-${lockedScrollY}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.overflow = "hidden";
      body.style.overscrollBehavior = "none";

      if (scrollbarWidth > 0) {
        body.style.paddingRight = `${scrollbarWidth}px`;
      }
    }

    activeLocks += 1;

    const preventBackgroundTouchMove = (event: TouchEvent) => {
      if (!getScrollArea(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", preventBackgroundTouchMove, {
      passive: false,
    });

    return () => {
      document.removeEventListener("touchmove", preventBackgroundTouchMove);
      activeLocks -= 1;

      if (activeLocks > 0 || !originalStyles) {
        return;
      }

      body.style.left = originalStyles.bodyLeft;
      body.style.overflow = originalStyles.bodyOverflow;
      body.style.overscrollBehavior = originalStyles.bodyOverscrollBehavior;
      body.style.paddingRight = originalStyles.bodyPaddingRight;
      body.style.position = originalStyles.bodyPosition;
      body.style.right = originalStyles.bodyRight;
      body.style.top = originalStyles.bodyTop;
      body.style.width = originalStyles.bodyWidth;
      root.style.overflow = originalStyles.rootOverflow;
      root.style.overscrollBehavior = originalStyles.rootOverscrollBehavior;

      root.style.scrollBehavior = "auto";
      window.scrollTo(0, lockedScrollY);
      root.style.scrollBehavior = originalStyles.rootScrollBehavior;
      originalStyles = undefined;
    };
  }, [isLocked]);
}
