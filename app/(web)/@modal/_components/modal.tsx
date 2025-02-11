"use client";

import type { ElementRef } from "react";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // dialog ref to control the dialog open state
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  // content ref to disable body scroll
  const contentRef = useRef<ElementRef<"div">>(null);
  const initialScrollRef = useRef<number | null>(null);
  const isBodyLockedRef = useRef(false);

  const scrollableRef = useRef<ElementRef<"div">>(null);

  // Wrap onDismiss with useCallback
  const onDismiss = useCallback(() => {
    // Instead of using the dialog's built-in close,
    // we'll just handle the navigation and let Next.js
    // handle the unmounting
    router.back();
  }, [router]);

  // Now the effect can safely depend on onDismiss
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) {
      dialog?.showModal();
    }

    // Prevent default Escape key behavior
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onDismiss();
      }
    };

    dialog?.addEventListener("keydown", handleKeyDown);
    return () => dialog?.removeEventListener("keydown", handleKeyDown);
  }, [onDismiss]);

  // Handle scroll locking
  useLayoutEffect(() => {
    // Always store scroll position and lock if we haven't already
    if (!isBodyLockedRef.current && initialScrollRef.current === null) {
      initialScrollRef.current = window.scrollY;
      isBodyLockedRef.current = true;

      // Lock the body
      document.body.style.position = "fixed";
      document.body.style.top = `-${initialScrollRef.current}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden"; // Add this to ensure no scrolling
    }

    return () => {
      // Only proceed with cleanup if we were the ones who locked it
      if (isBodyLockedRef.current) {
        const scrollTarget = initialScrollRef.current;

        // Reset refs
        initialScrollRef.current = null;
        isBodyLockedRef.current = false;

        // Reset body styles
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = ""; // Reset overflow

        if (scrollTarget !== null) {
          setTimeout(() => {
            requestAnimationFrame(() => {
              window.scrollTo(0, scrollTarget);
            });
          }, 0);
        }
      }
    };
  }, []);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Modal root element not found");

  return createPortal(
    <dialog ref={dialogRef} data-dialog-type="modal" className="z-[10] m-0 h-[100dvh] w-screen bg-background " onClose={onDismiss}>
      <div ref={scrollableRef} className="relative h-full w-full overflow-y-auto p-4">
        <button type="button" onClick={onDismiss} className="fixed top-0 right-0 z-[20] p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base">
          X
        </button>
        {/* content ref to disable body scroll */}
        <div ref={contentRef} className="flex h-full flex-col justify-between">
          {children}
        </div>
      </div>
    </dialog>,
    modalRoot,
  );
}
