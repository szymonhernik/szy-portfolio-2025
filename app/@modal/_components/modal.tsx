"use client";

import type { ElementRef } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (to === "garden") {
      // If we need to show the garden modal first
      router.push(`/garden?from=${from}`);
    } else if (from !== null) {
      // Normal back behavior
      router.push(from || "/");
    } else {
      router.back();
    }
  }

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) throw new Error("Modal root element not found");

  return createPortal(
    <dialog ref={dialogRef} className="m-0 h-screen w-screen overscroll-none bg-background p-4" onClose={onDismiss}>
      <button type="button" onClick={onDismiss} className="fixed top-0 right-0 p-4 text-large hover:font-outline-1-black md:text-default-v2">
        X
      </button>
      {children}
    </dialog>,
    modalRoot,
  );
}
