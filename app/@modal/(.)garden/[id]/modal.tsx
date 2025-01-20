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
    <div className="modal-backdrop">
      <dialog ref={dialogRef} className="modal" onClose={onDismiss}>
        {children}
        <button type="button" onClick={onDismiss} className="close-button" />
      </dialog>
    </div>,
    modalRoot,
  );
}
