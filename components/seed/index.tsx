"use client";

import { useGarden } from "@/app/_components/garden-context";

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
  const { openGarden } = useGarden();
  const handleClick = () => {
    if (itemId) {
      openGarden(itemId);
    } else {
      openGarden();
    }
    onClick?.();
  };

  return (
    <button onClick={handleClick} className={className} type="button">
      {content}
    </button>
  );
}
