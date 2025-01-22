"use client";

import type { ElementRef } from "react";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const contentRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  useEffect(() => {
    const targetElement = contentRef.current;
    if (targetElement) {
      disableBodyScroll(targetElement);
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Modal root element not found");

  return createPortal(
    <dialog ref={dialogRef} className="m-0 h-screen w-screen bg-background p-4" onClose={onDismiss}>
      <button type="button" onClick={onDismiss} className="fixed top-0 right-0 z-[20] p-4 text-large hover:font-outline-1-black md:text-default">
        X
      </button>
      <div ref={contentRef} className="">
        {children}
      </div>
    </dialog>,
    modalRoot,
  );
}
