"use client";

import { items } from "@/app/_test-data/items";

import { useState } from "react";

export default function Seed({
  content,
  onClick,
  className,
  itemId,
}: {
  content: string;
  onClick?: () => void;
  className?: string;
  itemId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // If itemId is provided, show only that item, otherwise show all items
  const displayItems = itemId ? items.filter((item) => item.id === Number(itemId)) : items;

  return (
    <>
      <button className={`underline ${className}`} type="button" onClick={() => setIsOpen(true)}>
        {content}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[120] h-screen w-screen overflow-y-auto overscroll-none bg-background p-4">
          <div className="">
            <div className="mb-4 flex justify-between">
              <h2 className="">An overgrown garden of inspirations</h2>
              <button type="button" onClick={() => setIsOpen(false)} className="fixed top-4 right-4 text-large md:text-default-v2">
                X
              </button>
            </div>
            <div className=" text-large">
              {displayItems.map((item) => (
                <span key={item.id} className="">
                  {item.text}
                  {/* add a comma after each item */}
                  {item.id !== displayItems.length && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
