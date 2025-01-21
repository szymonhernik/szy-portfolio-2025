"use client";

import { items } from "@/app/_test-data/items";
import { FixModalCloseBug } from "@/components/fix-modal-close-bug";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useEffect, useRef } from "react";

import GardenItem from "./GardenItem";
import { Modal } from "./modal";

export default function GardenItemModal({
  params,
}: {
  params: { id: string };
}) {
  const targetRef = useRef(null);
  const itemId = params.id;
  const item = items.find((item) => item.id === Number(itemId));

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
    <FixModalCloseBug expectedPath={`/garden/${itemId}`}>
      <Modal>
        <div ref={targetRef} className="-webkit-overflow-scrolling-touch overflow-y-auto">
          <GardenItem params={params} />
        </div>
      </Modal>
    </FixModalCloseBug>
  );
}
