"use client";

import type { ElementRef } from "react";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // dialog ref to control the dialog open state
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  // content ref to disable body scroll
  const contentRef = useRef<ElementRef<"div">>(null);

  // dismiss the modal
  function onDismiss() {
    // Instead of using the dialog's built-in close,
    // we'll just handle the navigation and let Next.js
    // handle the unmounting
    router.back();
  }

  // control the dialog open state
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
  }, []);

  // Update the scroll lock effect
  useLayoutEffect(() => {
    if (dialogRef.current) {
      // Store original requestAnimationFrame
      const storedRequestAnimationFrame = window.requestAnimationFrame;

      // Temporarily override requestAnimationFrame
      window.requestAnimationFrame = () => 42;

      disableBodyScroll(dialogRef.current, {
        reserveScrollBarGap: true,
        allowTouchMove: (el) => {
          return el.classList.contains("overflow-auto");
        },
      });

      // Restore original requestAnimationFrame
      window.requestAnimationFrame = storedRequestAnimationFrame;
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Modal root element not found");

  return createPortal(
    <dialog
      ref={dialogRef}
      data-dialog-type="modal"
      className="z-[10] m-0 h-[100dvh] w-screen overflow-y-scroll bg-background p-4"
      onClose={onDismiss}
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
    </dialog>,
    modalRoot,
  );
}
