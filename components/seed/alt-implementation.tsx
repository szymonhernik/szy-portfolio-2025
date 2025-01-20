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

export default function SeedAlt({
  content,
  className,
  itemId,
}: {
  content: string;
  onClick?: () => void;
  className?: string;
  itemId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={`underline ${className}`} type="button">
          {content}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>An overgrown garden of inspirations</DialogTitle>
        </DialogHeader>
        <div>
          {items.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <span className="cursor-pointer hover:underline">
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
