"use client";

import { items } from "@/app/_test-data/items";

import Link from "next/link";

export default function GardenList() {
  return (
    <section className="flex flex-col gap-4">
      <p>An overgrown garden of inspirations</p>
      <div>
        {items.map((item, index) => (
          <div key={item.id} className="inline text-large hover:font-outline-1-black">
            <Link className="" href={`/garden/${item.id}`} passHref>
              {item.text}
            </Link>
            {index < items.length - 1 && ", "}
          </div>
        ))}
      </div>
    </section>
  );
}
