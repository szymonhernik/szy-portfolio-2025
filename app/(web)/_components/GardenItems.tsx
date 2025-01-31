"use client";

import type { GardenItemsQueryResult } from "@/sanity.types";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

interface GardenItemsProps {
  mode: "modal" | "static";
  onItemSelect?: (item: GardenItemsQueryResult[0]) => void;
  items: GardenItemsQueryResult;
}

export function GardenItems({ mode, onItemSelect, items }: GardenItemsProps) {
  const router = useRouter();
  const searchParams = mode === "static" ? useSearchParams() : undefined;

  useEffect(() => {
    const item = searchParams?.get("item");
    if (item) {
      router.push(`/garden/${item}`);
    }
  }, [searchParams, router]);
  return (
    <section className="flex flex-col gap-4">
      <p>An overgrown garden of inspirations</p>

      <div>
        {items.map((item, index) => (
          <div key={item.slug} className="inline text-fluid-xl hover:font-outline-1-black">
            {mode === "modal" ? (
              // biome-ignore lint/a11y/useSemanticElements: using span for interactive element
              <span
                role="button"
                tabIndex={0}
                aria-roledescription="select item"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onItemSelect?.(item);
                  }
                }}
                onClick={() => onItemSelect?.(item)}
              >
                {item.title}
              </span>
            ) : (
              <Link href={`/garden/${item.slug}`}>{item.title}</Link>
            )}
            {index < items.length - 1 && ", "}
          </div>
        ))}
      </div>
    </section>
  );
}
