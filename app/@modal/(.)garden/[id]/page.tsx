"use client";

import { items } from "@/app/_test-data/items";

import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";
import { useEffect, useRef } from "react";

import { Modal } from "./modal";

export default function PhotoModal({ params }: { params: { id: string } }) {
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
    <Modal>
      <div
        ref={targetRef}
        className="max-h-[80vh] overflow-y-auto -webkit-overflow-scrolling-touch"
      >
        <h1 className="">{item?.text}</h1>
      </div>
    </Modal>
  );
}
