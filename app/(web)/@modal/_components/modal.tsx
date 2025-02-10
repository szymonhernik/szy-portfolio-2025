"use client";

import type { ElementRef } from "react";

import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
    // Only store the scroll position if body isn't already locked
    if (!isBodyLockedRef.current && initialScrollRef.current === null) {
      initialScrollRef.current = window.scrollY;
      isBodyLockedRef.current = true;
      console.log("Initial scroll position stored:", initialScrollRef.current);
    }

    // Lock the body only if not already locked
    if (!isBodyLockedRef.current) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${initialScrollRef.current}px`;
      document.body.style.width = "100%";
    }

    return () => {
      console.log(
        "Cleanup running, stored position:",
        initialScrollRef.current,
      );
      const scrollTarget = initialScrollRef.current;

      // Only proceed with cleanup if we were the ones who locked it
      if (isBodyLockedRef.current) {
        // Reset refs
        initialScrollRef.current = null;
        isBodyLockedRef.current = false;

        // Reset body styles
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";

        if (scrollTarget !== null) {
          console.log("Attempting to restore to:", scrollTarget);
          setTimeout(() => {
            requestAnimationFrame(() => {
              window.scrollTo(0, scrollTarget);
              console.log("Scroll restoration complete");
            });
          }, 0);
        }
      }
    };
  }, []);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Modal root element not found");

  return createPortal(
    <dialog
      ref={dialogRef}
      data-dialog-type="modal"
      className="z-[10] m-0 h-[100dvh] w-screen  bg-background p-4 "
      onClose={onDismiss}
    >
      <div
        ref={scrollableRef}
        className="relative h-full w-full overflow-y-auto"
      >
        <button
          type="button"
          onClick={onDismiss}
          className="fixed top-0 right-0 z-[20] p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base"
        >
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
