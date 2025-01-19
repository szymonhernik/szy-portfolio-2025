"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavigationDesktop() {
  return (
    <div className="fixed top-4 right-4 z-50 hidden md:block">
      <nav className="">
        <h1>
          <NavLink />
        </h1>
      </nav>
    </div>
  );
}

export function NavigationMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className={clsx(
          "text-large pl-4 fixed top-4 right-4 z-[100] md:hidden overscroll-none transition-transform duration-300",
          isOpen ? "translate-y-[calc(100svh-170px)]" : "translate-y-0",
        )}
        onClick={() => setIsOpen(true)}
      >
        S<br />
        Z<br />Y
      </button>
      <MobileSheet isOpen={isOpen} toggle={setIsOpen} />
    </>
  );
}

function MobileSheet({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 h-screen w-screen bg-background z-[90] md:hidden overscroll-none flex flex-col justify-center items-center transition-transform duration-300 overscroll-y-contain",
        "translate-y-0",
      )}
    >
      <button
        type="button"
        className="absolute top-4 right-4 text-large "
        onClick={() => toggle(false)}
      >
        X
      </button>
      <nav>
        <ul className="text-large list-none text-center">
          <li>Information</li>
          <li>Projects</li>
          <li>Garden</li>
        </ul>
      </nav>
    </div>
  );
}

// if path is /information, then return <Link href="/">Projects</Link> if its / return <Link href="/information">Information</Link>
// use next pathname to get the current path

function NavLink() {
  const pathname = usePathname();
  if (pathname === "/information") {
    return <Link href="/">Projects</Link>;
  }
  return <Link href="/information">Information</Link>;
}
