"use client";

import { items } from "@/app/_test-data/items";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function SeedAlt({
  content,
  className,
  itemId,
  onClick,
}: {
  content: string;
  onClick?: () => void;
  className?: string;
  itemId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  const handleMainDialogOpen = (open: boolean) => {
    setIsOpen(open);
    // When opening the main dialog, if we have an itemId, open that item's dialog
    if (open && itemId) {
      setSelectedItemId(Number(itemId));
    } else if (!open) {
      // When closing the main dialog, close any open item dialog
      setSelectedItemId(null);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleMainDialogOpen}>
      <Dialog.Trigger asChild>
        <button className={`underline ${className}`} type="button">
          {content}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-blue-200" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-screen max-h-screen -translate-x-1/2 -translate-y-1/2 overflow-y-auto bg-white p-6">
          <Dialog.Title className="text-lg font-semibold">
            An overgrown garden of inspirations
          </Dialog.Title>

          <div>
            {items.map((item) => (
              <Dialog.Root
                key={item.id}
                open={selectedItemId === item.id}
                onOpenChange={(open) => {
                  setSelectedItemId(open ? item.id : null);
                }}
              >
                <Dialog.Trigger asChild>
                  <span
                    className="text-large cursor-pointer hover:underline"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setSelectedItemId(item.id);
                      }
                    }}
                  >
                    {item.text}
                    {item.id !== items.length && ", "}
                  </span>
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 bg-yellow-200" />
                  <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
                    <Dialog.Title className="text-lg font-semibold">
                      {item.text}
                    </Dialog.Title>
                    <div>{item.text}</div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
