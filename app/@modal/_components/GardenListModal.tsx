"use client";

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
    <Modal>
      <GardenList />
    </Modal>
  );
}
