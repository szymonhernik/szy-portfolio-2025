"use client";

import { items } from "@/app/_test-data/items";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";

interface ItemModalProps {
  item: (typeof items)[0];
  onClose: () => void;
}

function ItemModal({ item, onClose }: ItemModalProps) {
  return (
    <FocusLock returnFocus>
      <div aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black/50"
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              onClose();
            }
          }}
        />
        <div className="relative m-4 w-full max-w-2xl rounded-lg bg-white p-8">
          <h2 id="modal-title" className="mb-4 font-bold text-xl">
            {item.text}
          </h2>
          {/* Add more item details here */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4"
            aria-label="Close dialog"
            type="button"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose();
              }
            }}
          >
            ×
          </button>
        </div>
      </div>
    </FocusLock>
  );
}

export default function GardenList() {
  const searchParams = useSearchParams();
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(null);

  useEffect(() => {
    const itemId = searchParams.get("item");
    if (itemId) {
      const item = items.find((i) => i.id === Number(itemId));
      if (item) {
        setSelectedItem(item);
      }
    }
  }, [searchParams]);

  return (
    <section className="flex flex-col gap-4">
      <p>An overgrown garden of inspirations</p>
      <div>
        {items.map((item, index) => (
          <div key={item.id} className="inline text-large hover:font-outline-1-black">
            <button type="button" onClick={() => setSelectedItem(item)}>
              {item.text}
            </button>
            {index < items.length - 1 && ", "}
          </div>
        ))}
      </div>

      {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </section>
  );
}
