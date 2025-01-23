"use client";

import Link from "next/link";

export function OpenGardenItem({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={`/garden?item=${slug}&direct=true`} className="text-link hover:font-outline-1-secondary">
      {children}
    </Link>
  );
}
