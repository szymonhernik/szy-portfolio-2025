"use client";

import { IszSziStudioContent } from "@/components/screens/iszszistudio";

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
      <article>
        <IszSziStudioContent />
      </article>
    </Modal>
  );
}
