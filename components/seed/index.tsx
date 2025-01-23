"use client";

import { items } from "@/app/(web)/_test-data/items";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

import ItemDialog from "../item-dialog";

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
          <Dialog.Title className="">An overgrown garden of inspirations</Dialog.Title>
          <Dialog.Close className="fixed top-2 right-2 p-2 text-large hover:font-outline-1-black md:text-default">X</Dialog.Close>

          <div>
            {items.map((item) => (
              <ItemDialog
                key={item.id}
                item={item}
                showComma={item.id !== items.length}
                open={selectedItemId === item.id}
                onOpenChange={(open) => {
                  setSelectedItemId(open ? item.id : null);
                }}
              />
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
