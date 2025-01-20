"use client";

import { items } from "@/app/_test-data/items";

import { useSearchParams } from "next/navigation";

export default function GardenItem() {
  const id = useSearchParams().get("id");
  if (!id) return null;
  const item = items.find((item) => item.id === Number(id));
  return (
    <div className="fixed inset-0 z-[150] flex flex-col gap-4 overflow-y-auto overscroll-none bg-background p-4">
      <h1>Garden Item</h1>
      <div>{item?.id}</div>

      <p>{item?.text}</p>
    </div>
  );
}
