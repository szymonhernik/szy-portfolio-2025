"use client";

import { GardenItems } from "@/app/_components/GardenItems";
import { items } from "@/app/_test-data/items";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FocusLock from "react-focus-lock";

interface ItemModalProps {
  item: (typeof items)[0];
  onClose: () => void;
}

function ItemModal({ item, onClose }: ItemModalProps) {
  console.log("item", item);

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
          {/* breadcrumbs to navigate between garden and items */}
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose}>
              garden
            </button>
            <span>→</span>
            <span>{item.text}</span>
          </div>
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
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<(typeof items)[0] | null>(null);

  useEffect(() => {
    const itemSlug = searchParams.get("item");
    if (itemSlug) {
      const item = items.find((i) => i.slug === itemSlug);
      if (!item) {
        console.warn(`No item found for slug: "${itemSlug}". Available slugs are: ${items.map((i) => i.slug).join(", ")}`);
      }
      setSelectedItem(item || null);
    } else {
      setSelectedItem(null);
    }
  }, [searchParams]);

  const handleItemSelect = (item: (typeof items)[0]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("item", item.slug);

    router.replace(`?${params.toString()}`);
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    const isDirect = params.get("direct") === "true";
    params.delete("direct");
    params.delete("item");

    if (isDirect) {
      router.back();
    } else {
      router.replace(`?${params.toString()}`);
    }
  };

  return (
    <>
      <GardenItems mode="modal" onItemSelect={handleItemSelect} />
      {selectedItem && <ItemModal item={selectedItem} onClose={handleClose} />}
    </>
  );
}
