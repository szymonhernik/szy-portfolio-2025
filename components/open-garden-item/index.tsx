"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function OpenGardenItem({
  itemId,
  children,
}: {
  itemId: string;
  children: React.ReactNode;
}) {
  const currentPath = usePathname();

  return (
    <Link href={`/garden/${itemId}?from=${currentPath}&to=garden`} className="text-link hover:font-outline-1-secondary">
      {children}
    </Link>
  );
}
