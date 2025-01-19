"use client";

import { useGarden } from "@/app/_components/garden-context";
import { items } from "@/app/_test-data";
import Seed from "@/components/seed";

import React, { useEffect, useRef, useState } from "react";

export default function DailyInspirations() {
  const { isOpen, selectedItemId, openGarden, closeGarden } = useGarden();
  const [randomItems, setRandomItems] = useState<typeof items>([]);

  useEffect(() => {
    const getRandomItems = () => {
      return [...items].sort(() => Math.random() - 0.5).slice(0, 3);
    };

    setRandomItems(getRandomItems());
  }, []); // Empty dependency array is fine now since all dependencies are inside the effect

  const handleItemClick = (id: number) => {
    openGarden(id.toString());
  };

  return (
    <>
      {isOpen && <OverlayList onClose={closeGarden} initialSelectedItemId={selectedItemId} />}
      <p className="mt-0">
        Today's three random inspirations from a rather <Seed content="unsorted list" className="text-secondary" /> are:{" "}
        {randomItems.map((item, index) => (
          <React.Fragment key={`${item.id}-random`}>
            <button type="button" className="text-secondary" onClick={() => handleItemClick(item.id)}>
              {item.text}
            </button>
            {index < 2 ? ", " : "."}
          </React.Fragment>
        ))}
      </p>
    </>
  );
}

// How you get to the list - garden
// mobile: through the menu and the paragraph on the home page
// desktop: through the paragraph on the home page

export function OverlayList({
  onClose,
  initialSelectedItemId,
}: {
  onClose: () => void;
  initialSelectedItemId: string | null;
}) {
  const { openGarden } = useGarden();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedFromList, setSelectedFromList] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleItemSelect = (item: (typeof items)[0]) => {
    setSelectedFromList(true); // Track that selection came from list
    openGarden(item.id.toString());
    if (overlayRef.current) {
      setScrollPosition(overlayRef.current.scrollTop);
    }
  };

  useEffect(() => {
    // If initialSelectedItemId is set but we didn't select from list,
    // it must be a direct selection
    if (initialSelectedItemId && !selectedFromList) {
      setSelectedFromList(false);
    }
  }, [initialSelectedItemId, selectedFromList]);

  if (initialSelectedItemId) {
    return (
      <DetailOverlay
        itemId={initialSelectedItemId}
        onClose={() => {
          if (selectedFromList) {
            // If selected from list, go back to list
            openGarden();
          } else {
            // If direct selection, close everything
            onClose();
          }
          setSelectedFromList(false);
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
      <div className="text-large">
        {items.map((item) => (
          <span
            key={item.id}
            onClick={() => handleItemSelect(item)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleItemSelect(item);
              }
            }}
            className="cursor-pointer hover:text-secondary"
            aria-label={`View details about ${item.text}`}
          >
            {item.text}
            <span aria-hidden="true">{item !== items[items.length - 1] && ", "}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function DetailOverlay({
  itemId,
  onClose,
}: {
  itemId: string;
  onClose: () => void;
}) {
  const itemIdNumber = Number.parseInt(itemId);
  return (
    <div className="fixed inset-0 z-[200] overflow-y-auto overscroll-none bg-background p-4">
      <button className="fixed top-4 right-4" onClick={onClose} type="button">
        X
      </button>
      <h2 className="mb-4 text-[2rem]">{itemId}</h2>
      <p>
        Text for {itemId} is {items.find((item) => item.id === itemIdNumber)?.text}
      </p>
    </div>
  );
}
