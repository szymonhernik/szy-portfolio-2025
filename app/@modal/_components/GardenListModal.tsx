"use client";

import { FixModalCloseBug } from "@/components/fix-modal-close-bug";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef } from "react";

import GardenList from "./GardenList";
import { Modal } from "./modal";

export default function GardenListModal() {
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
    <FixModalCloseBug expectedPath="/garden">
      <Modal>
        <div
          ref={targetRef}
          className="-webkit-overflow-scrolling-touch overflow-y-auto"
        >
          <GardenList />
        </div>
      </Modal>
    </FixModalCloseBug>
  );
}
