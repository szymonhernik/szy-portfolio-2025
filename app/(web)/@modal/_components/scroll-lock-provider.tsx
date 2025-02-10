"use client";

import { useLayoutEffect } from "react";

export function ScrollLockProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    // Store current scroll position
    const scrollY = window.scrollY;

    // Lock the body
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      // Restore scroll position when modal closes
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  return children;
}
