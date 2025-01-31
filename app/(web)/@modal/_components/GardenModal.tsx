"use client";

import type { GardenItemsQueryResult, SingleGardenItemQueryResult } from "@/sanity.types";

import { GardenItems } from "@/app/(web)/_components/GardenItems";
import { GardenBreadcrumb } from "@/components/breadcrumb/garden";
import GardenBlocks from "@/components/gardenblocks";
import { useGardenItem } from "@/lib/queries/react-query/garden";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FocusLock from "react-focus-lock";

interface ItemModalProps {
  item: GardenItemsQueryResult[0];
  onClose: () => void;
}

function ItemModal({ item: initialItem, onClose }: ItemModalProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  if (!initialItem.slug) {
    return null;
  }
  // fetch data for the item client side (using tanstack query)
  const { data: item } = useGardenItem(initialItem.slug);
  if (!item) {
    return null;
  }
  console.log("item", item);

  const handleGardenClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("item");
    params.delete("direct");
    router.replace(`?${params.toString()}`);
  };

  return (
    <FocusLock returnFocus>
      <div aria-modal="true" aria-labelledby="modal-title" className="fixed inset-0 z-50 overflow-y-auto bg-white">
        <div className="p-4 ">
          {/* breadcrumbs to navigate between garden and items */}
          <GardenBreadcrumb title={item.title} onClick={handleGardenClick} />
          <article>
            {/* plant emoji */}

            <GardenModalContent item={item} />
          </article>
          {/* Add more item details here */}
          <button
            onClick={onClose}
            className="fixed top-0 right-0 z-[20] p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base"
            aria-label="Close dialog"
            type="button"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                onClose();
              }
            }}
          >
            X
          </button>
        </div>
      </div>
    </FocusLock>
  );
}

function GardenModalContent({
  item,
}: {
  item: NonNullable<SingleGardenItemQueryResult>;
}) {
  return <GardenBlocks blocks={item.gardenBlocks} />;
}

export default function GardenModal({
  items,
}: {
  items: GardenItemsQueryResult;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState<GardenItemsQueryResult[0] | null>(null);

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
  }, [searchParams, items]);

  const handleItemSelect = (item: GardenItemsQueryResult[0]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (item.slug) {
      // Add null check
      params.set("item", item.slug);
      router.replace(`?${params.toString()}`);
    }
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
      {!selectedItem && (
        <Suspense fallback={<div>🌱</div>}>
          <GardenItems mode="modal" onItemSelect={handleItemSelect} items={items} />
        </Suspense>
      )}
      {selectedItem && (
        <Suspense fallback={<div>🌱</div>}>
          <ItemModal item={selectedItem} onClose={handleClose} />
        </Suspense>
      )}
    </>
  );
}
