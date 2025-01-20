"use client";

import { items } from "@/app/_test-data/items";

import { useEffect, useRef, useState } from "react";

const SelectedItemOverlay = ({
  item,
  onClose,
  closeRef,
}: {
  item: (typeof items)[0];
  onClose: () => void;
  closeRef: React.RefObject<HTMLButtonElement>;
}) => (
  <div
    className="fixed  inset-0 bg-background  z-[130] h-screen w-screen overflow-y-auto overscroll-none  p-4"
    role="dialog"
    aria-modal="true"
  >
    <div className="">
      <div className="mb-4 flex justify-between"></div>
      <div className="text-large">{item.text}</div>
    </div>
    <button
      ref={closeRef}
      type="button"
      onClick={onClose}
      className="fixed top-4 right-4 text-large md:text-default-v2"
      tabIndex={0}
    >
      X
    </button>
  </div>
);

export default function Seed({
  content,
  onClick,
  className,
  itemId,
}: {
  content: string;
  onClick?: () => void;
  className?: string;
  itemId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  // Create a ref map to store references to all items
  const itemRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  // Add ref for the selected item overlay close button
  const selectedOverlayCloseRef = useRef<HTMLButtonElement>(null);

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // If selected item overlay is open, close it first
        if (selectedItem !== null) {
          handleClose();
          // Otherwise close the list overlay if it's open
        } else if (isOpen) {
          handleClose();
        }
      }
    };

    // Add event listener when either overlay is open
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      // Clean up
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, selectedItem]); // Dependencies for the effect

  const handleOpen = () => {
    setIsOpen(true);
    if (itemId) {
      setSelectedItem(Number(itemId));
    }
  };

  const handleClose = () => {
    if (selectedItem !== null) {
      // Get the ref of the previously selected item
      const itemToFocus = itemRefs.current.get(selectedItem);
      setSelectedItem(null);
      // Focus the previously selected item
      setTimeout(() => {
        itemToFocus?.focus();
      }, 0);
    } else {
      setIsOpen(false);
    }
  };

  // If itemId is provided, show only that item, otherwise show all items
  const displayItems = items;
  const selectedItemData = items.find((item) => item.id === selectedItem);

  const handleItemClick = (id: number) => {
    // If there's already a selected item, close it first
    if (selectedItem !== null) {
      setSelectedItem(null);
      // Wait for the current overlay to close before opening the new one
      setTimeout(() => {
        setSelectedItem(id);
        selectedOverlayCloseRef.current?.focus();
      }, 0);
    } else {
      // If no item is selected, just open the new one
      setSelectedItem(id);
      setTimeout(() => {
        selectedOverlayCloseRef.current?.focus();
      }, 0);
    }
  };

  return (
    <>
      <button
        className={`underline ${className}`}
        type="button"
        onClick={handleOpen}
      >
        {content}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-[120] h-screen w-screen overflow-y-auto overscroll-none p-4 bg-background"
          role="dialog"
          aria-modal="true"
          inert={selectedItemData ? true : undefined}
          tabIndex={-1}
        >
          <div className="">
            <div className="mb-4 flex justify-between">
              <h2 className="">An overgrown garden of inspirations</h2>
              <button
                type="button"
                role="button"
                onClick={handleClose}
                className="fixed top-4 right-4 text-large md:text-default-v2"
                tabIndex={selectedItemData ? -1 : 0}
              >
                X
              </button>
            </div>
            <div className="text-large">
              {items.map((item) => (
                <span
                  key={item.id}
                  ref={(el) => {
                    if (el) {
                      itemRefs.current.set(item.id, el);
                    } else {
                      itemRefs.current.delete(item.id);
                    }
                  }}
                  role="button"
                  className="cursor-pointer hover:underline"
                  onClick={() => handleItemClick(item.id)}
                  tabIndex={selectedItemData ? -1 : 0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // allow opening the selected item overlay only if no item is selected
                      if (selectedItem === null) {
                        handleItemClick(item.id);
                      }
                    }
                  }}
                >
                  {item.text}
                  {item.id !== items.length && ", "}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedItemData && (
        <SelectedItemOverlay
          item={selectedItemData}
          onClose={handleClose}
          closeRef={selectedOverlayCloseRef}
        />
      )}
    </>
  );
}
