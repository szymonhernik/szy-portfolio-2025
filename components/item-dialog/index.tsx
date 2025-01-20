"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function ItemDialog({
  item,
  showComma = true,
}: {
  item: { id: number; text: string };
  showComma?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <span
          className="cursor-pointer text-large hover:text-secondary"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setIsOpen(true);
            }
          }}
        >
          {item.text}
          {showComma && ", "}
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="fixed inset-0 z-[140] bg-white p-4">
          <Dialog.Close className="fixed top-0 right-0 p-4 text-large md:text-default-v2">X</Dialog.Close>
          <Dialog.Title className="text-large">{item.text}</Dialog.Title>
          <div>{item.text}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
