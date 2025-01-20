"use client";

import { items } from "@/app/_test-data/items";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function Seed({
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
      onClick?.();
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleMainDialogOpen}>
      <Dialog.Trigger asChild>
        <button className={`${className}`} type="button">
          {content}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Content className=" fixed inset-0 z-[120] flex max-h-screen w-screen flex-col gap-8 overflow-y-auto bg-background p-4 text-black">
          <Dialog.Title className="">
            An overgrown garden of inspirations
          </Dialog.Title>
          <Dialog.Close className="fixed top-2 right-2 p-2 text-large md:text-default-v2">
            X
          </Dialog.Close>

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
                    className="cursor-pointer text-large hover:text-secondary"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        setSelectedItemId(item.id);
                      }
                    }}
                  >
                    {item.text}
                  </span>
                </Dialog.Trigger>
                <span className="text-large">
                  {item.id !== items.length && ", "}
                </span>
                <Dialog.Portal>
                  <Dialog.Content className="fixed inset-0 z-[140] bg-white p-4 ">
                    <Dialog.Close className="fixed top-2 right-2 p-2 text-large md:text-default-v2">
                      X
                    </Dialog.Close>
                    <Dialog.Title className="text-large">
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
