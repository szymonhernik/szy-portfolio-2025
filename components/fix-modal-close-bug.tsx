"use client";

import type { ReactNode } from "react";

import { usePathname } from "next/navigation";

export const FixModalCloseBug = ({
  expectedPath,
  children,
}: {
  expectedPath: string | RegExp;
  children: ReactNode;
}) => {
  const pathname = usePathname();

  if (expectedPath instanceof RegExp) {
    if (expectedPath.test(pathname)) {
      return children;
    }
    return null;
  }
  if (pathname.includes(expectedPath)) {
    return children;
  }
  return null;
};
