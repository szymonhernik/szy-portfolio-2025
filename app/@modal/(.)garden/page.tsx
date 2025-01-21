"use client";

import { items } from "@/app/_test-data/items";

import Link from "next/link";
import { useEffect } from "react";

import { Modal } from "./[id]/modal";

export default function Photos() {
  useEffect(() => {
    // Restore scroll position from sessionStorage when component mounts
    const savedScrollPosition = sessionStorage.getItem("listScrollPosition");
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition));
    }
  }, []);

  const handleLinkClick = () => {
    // Save scroll position to sessionStorage before navigation
    sessionStorage.setItem("listScrollPosition", window.scrollY.toString());
  };

  return (
    <Modal>
      <section className="">
        {items.map((item, index) => (
          <div key={item.id} className="inline text-large">
            <Link
              className=""
              href={`/garden/${item.id}`}
              onClick={handleLinkClick}
              passHref
            >
              {item.text}
            </Link>
            {index < items.length - 1 && ", "}
          </div>
        ))}
      </section>
    </Modal>
  );
}
