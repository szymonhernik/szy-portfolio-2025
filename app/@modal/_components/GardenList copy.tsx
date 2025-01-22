"use client";

import { items } from "@/app/_test-data/items";

export default function GardenListCopy() {
  return (
    <section className="flex flex-col gap-4">
      <p>An overgrown garden of inspirations</p>
      <div>
        {items.map((item, index) => (
          <div key={item.id} className="inline text-large hover:font-outline-1-black">
            <button className="" type="button">
              {item.text}
            </button>
            {index < items.length - 1 && ", "}
          </div>
        ))}
      </div>
    </section>
  );
}
