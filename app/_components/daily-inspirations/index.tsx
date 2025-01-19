"use client";

import { useRef, useState } from "react";

export default function DailyInspirations() {
  const [displayList, setDisplayList] = useState(false);
  return (
    <>
      {displayList && <OverlayList onClose={() => setDisplayList(false)} />}
      <p className="mt-0">
        Today's three random inspirations from a rather{" "}
        <button
          type="button"
          className="text-secondary"
          onClick={() => {
            setDisplayList(true);
          }}
        >
          unsorted list
        </button>{" "}
        are: Paul B. Preciado's Can the monster speak?, Ian Cheng games, Kae
        Tempest lyrics.{" "}
      </p>
    </>
  );
}

// How you get to the list - garden
// mobile: through the menu and the paragraph on the home page
// desktop: through the paragraph on the home page

function OverlayList({ onClose }: { onClose: () => void }) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);

  const items = [
    "fresh apples",
    "Ire's tomato soup",
    "towering mountains",
    "old books",
    "wooden chairs",
    "sharp pencils",
    "playful dogs",
    "sturdy bridges",
    "sweet cupcakes",
    "acoustic guitars",
    "futuristic robots",
    "Kae Tempest' lyrics",
    "Paul B. Preciado's Can the monster speak?",
    "Ian Cheng games",
    "the hole in our living-room curtain",
    "the sound of a train",
    "the smell of rain",
    "the taste of coffee",
    "the feel of a soft pillow",
    "the sound of a train",
    "the smell of rain",
    "the taste of coffee",
    "sturdy bridges",
    "sweet cupcakes",
    "acoustic guitars",
    "futuristic robots",
    "Kae Tempest' lyrics",
    "Paul B. Preciado's Can the monster speak?",
    "Ian Cheng games",
    "the hole in our living-room curtain",
    "the sound of a train",
    "the smell of rain",
    "the taste of coffee",
    "the feel of a soft pillow",
    "the sound of a train",
    "the smell of rain",
    "the taste of coffee",
    "the feel of a soft pillow",
  ];

  if (selectedItem) {
    return (
      <DetailOverlay
        item={selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setTimeout(() => {
            if (overlayRef.current) {
              overlayRef.current.scrollTop = scrollPosition;
            }
          }, 0);
        }}
      />
    );
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-background z-[100] overscroll-none overflow-y-auto p-4"
    >
      <p>An overgrown garden of inspirations</p>
      <button className="fixed top-4 right-4" onClick={onClose} type="button">
        X
      </button>
      <div className="text-[3rem] leading-[1.2]">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setScrollPosition(overlayRef.current?.scrollTop || 0);
              setSelectedItem(item);
            }}
            className="hover:text-secondary"
          >
            {item}
            {index < items.length - 1 && ", "}
          </button>
        ))}
      </div>
    </div>
  );
}

function DetailOverlay({
  item,
  onClose,
}: {
  item: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-background z-[200] overscroll-none overflow-y-auto p-4">
      <button className="fixed top-4 right-4" onClick={onClose} type="button">
        X
      </button>
      <h2 className="text-[2rem] mb-4">{item}</h2>
      <p>Detailed content about {item} goes here...</p>
    </div>
  );
}
