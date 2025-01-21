"use client";

import type { ElementRef } from "react";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Modal root element not found");

  return createPortal(
    <dialog
      ref={dialogRef}
      className="h-screen w-screen p-4 bg-background m-0"
      onClose={onDismiss}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="fixed top-0 right-0 p-4 text-large md:text-default-v2"
      >
        X
      </button>
      {children}
    </dialog>,
    modalRoot,
  );
}
