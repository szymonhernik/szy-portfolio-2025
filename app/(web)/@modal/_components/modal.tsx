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

  // control the dialog open state
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
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

  // dismiss the modal
  function onDismiss() {
    router.back();
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Modal root element not found");

  return createPortal(
    <dialog
      ref={dialogRef}
      data-dialog-type="modal"
      className="m-0 h-[100dvh] z-[10] w-screen bg-background p-4 overflow-y-scroll"
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
      <div ref={contentRef} className="">
        {children}
      </div>
    </dialog>,
    modalRoot,
  );
}
