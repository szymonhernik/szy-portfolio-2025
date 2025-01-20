"use client";

import { items } from "@/app/_test-data/items";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

export default function SeedAlts({
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
    <Dialog open={isOpen} onOpenChange={handleMainDialogOpen}>
      <DialogTrigger asChild>
        <button className={`underline ${className}`} type="button">
          {content}
        </button>
      </DialogTrigger>

      <DialogContent className="w-screen max-w-none overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>An overgrown garden of inspirations</DialogTitle>
        </DialogHeader>
        <div>
          {items.map((item) => (
            <Dialog
              key={item.id}
              open={selectedItemId === item.id}
              onOpenChange={(open) => {
                setSelectedItemId(open ? item.id : null);
              }}
            >
              <DialogTrigger asChild>
                <span
                  className="text-large cursor-pointer hover:underline"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault(); // Prevent the default Enter behavior

                      setSelectedItemId(item.id);
                    }
                  }}
                >
                  {item.text}
                  {item.id !== items.length && ", "}
                </span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.text}</DialogTitle>
                </DialogHeader>
                <div>{item.text}</div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
