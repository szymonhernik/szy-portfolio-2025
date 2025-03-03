"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function ItemDialog({
  item,
  showComma = true,
  open,
  onOpenChange,
}: {
  item: { id: number; text: string };
  showComma?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const controlled = open !== undefined;

  return (
    <Dialog.Root open={controlled ? open : isOpen} onOpenChange={controlled ? onOpenChange : setIsOpen}>
      <Dialog.Trigger asChild>
        <span
          className="cursor-pointer text-fluid-xl hover:text-secondary"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (controlled) {
                onOpenChange?.(true);
              } else {
                setIsOpen(true);
              }
            }
          }}
        >
          {item.text}
          {showComma && ", "}
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-[140] bg-white p-4">
          <Dialog.Close className="fixed top-0 right-0 p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base">X</Dialog.Close>
          <Dialog.Title className="text-fluid-xl">{item.text}</Dialog.Title>
          <div>{item.text}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
