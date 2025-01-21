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

  return <Link href={`/garden/${itemId}?from=${currentPath}&to=garden`}>{children}</Link>;
}
