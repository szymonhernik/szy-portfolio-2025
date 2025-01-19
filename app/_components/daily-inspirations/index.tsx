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
        are: Paul B. Preciado's Can the monster speak?, Ian Cheng games, Kae Tempest lyrics.{" "}
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
    { id: 1, text: "fresh apples" },
    { id: 2, text: "Ire's tomato soup" },
    { id: 3, text: "towering mountains" },
    { id: 4, text: "old books" },
    { id: 5, text: "wooden chairs" },
    { id: 6, text: "sharp pencils" },
    { id: 7, text: "playful dogs" },
    { id: 8, text: "sturdy bridges" },
    { id: 9, text: "sweet cupcakes" },
    { id: 10, text: "acoustic guitars" },
    { id: 11, text: "futuristic robots" },
    { id: 12, text: "Kae Tempest' lyrics" },
    { id: 13, text: "Paul B. Preciado's Can the monster speak?" },
    { id: 14, text: "Ian Cheng games" },
    { id: 15, text: "the hole in our living-room curtain" },
    { id: 16, text: "the sound of a train" },
    { id: 17, text: "the smell of rain" },
    { id: 18, text: "the taste of coffee" },
    { id: 19, text: "the feel of a soft pillow" },
    { id: 20, text: "the sound of a train" },
    { id: 21, text: "the smell of rain" },
    { id: 22, text: "the taste of coffee" },
    { id: 23, text: "sturdy bridges" },
    { id: 24, text: "sweet cupcakes" },
    { id: 25, text: "acoustic guitars" },
    { id: 26, text: "futuristic robots" },
    { id: 27, text: "Kae Tempest' lyrics" },
    { id: 28, text: "Paul B. Preciado's Can the monster speak?" },
    { id: 29, text: "Ian Cheng games" },
    { id: 30, text: "the hole in our living-room curtain" },
    { id: 31, text: "the sound of a train" },
    { id: 32, text: "the smell of rain" },
    { id: 33, text: "the taste of coffee" },
    { id: 34, text: "the feel of a soft pillow" },
    { id: 35, text: "the sound of a train" },
    { id: 36, text: "the smell of rain" },
    { id: 37, text: "the taste of coffee" },
    { id: 38, text: "the feel of a soft pillow" },
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
    <div ref={overlayRef} className="fixed inset-0 z-[100] overflow-y-auto overscroll-none bg-background p-4">
      <p>An overgrown garden of inspirations</p>
      <button className="fixed top-4 right-4" onClick={onClose} type="button">
        X
      </button>
      <div className="text-[3rem] leading-[1.2]">
        {items.map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => {
              setScrollPosition(overlayRef.current?.scrollTop || 0);
              setSelectedItem(item.text);
            }}
            className="hover:text-secondary"
          >
            {item.text}
            {item !== items[items.length - 1] && ", "}
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
    <div className="fixed inset-0 z-[200] overflow-y-auto overscroll-none bg-background p-4">
      <button className="fixed top-4 right-4" onClick={onClose} type="button">
        X
      </button>
      <h2 className="mb-4 text-[2rem]">{item}</h2>
      <p>Detailed content about {item} goes here...</p>
    </div>
  );
}
