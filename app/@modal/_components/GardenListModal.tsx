"use client";

import { items } from "@/app/_test-data/items";
import { FixModalCloseBug } from "@/components/fix-modal-close-bug";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import Link from "next/link";
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
        <GardenList />
      </Modal>
    </FixModalCloseBug>
  );
}
