"use client";

import { items } from "@/app/_test-data/items";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GardenModal() {
  const router = useRouter();

  return (
    <div className="">
      <div>An overgrown garden of inspirations</div>
      <button
        type="button"
        className="fixed top-4 right-4 text-large md:text-default-v2"
        onClick={() => {
          router.back();
        }}
      >
        X
      </button>
      <div className="text-large">
        {items.map((item, index) => (
          <>
            <Link key={item.id} href={`/garden?id=${item.id}`}>
              {item.text}
            </Link>

            {index !== items.length - 1 && ", "}
          </>
        ))}
      </div>
    </div>
  );
}
