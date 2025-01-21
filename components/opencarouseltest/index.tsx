"use client";

import Link from "next/link";
import { useState } from "react";

export default function OpenedCarousel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsOpen(true)} type="button">
        Open Carousel
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-4 shadow-lg">
            <h2 className="mb-2 font-bold text-lg">Modal Title</h2>
            <p>Modal content goes here</p>
            <Link href="/garden">Open a garden modal from carousel to see if the state can be preserved with nextjs modals!</Link>

            <button onClick={() => setIsOpen(false)} type="button" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
