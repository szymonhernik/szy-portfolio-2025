"use client";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef } from "react";

import { Modal } from "../_components/modal";

export default function Page() {
  const targetRef = useRef(null);
  useEffect(() => {
    const targetElement = targetRef.current;
    if (targetElement) {
      disableBodyScroll(targetElement);
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, []);

  return (
    <Modal>
      <section className="flex flex-col gap-4">
        <p>isz szi studio</p>
      </section>
    </Modal>
  );
}
