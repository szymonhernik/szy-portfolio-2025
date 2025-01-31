"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavigationDesktop() {
  return (
    <div className="fixed top-4 right-4 z-50 hidden md:block">
      <nav className="">
        <h1 className="">
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
          "fixed top-4 right-4 z-[100] overscroll-none pl-4 text-fluid-xl transition-transform duration-300 md:hidden",
          isOpen ? "translate-y-[calc(100svh-170px)]" : "translate-y-0",
        )}
        onClick={() => setIsOpen(true)}
        type="button"
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
  const pathname = usePathname();
  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[90] flex h-[100dvh] w-screen flex-col items-center justify-center overscroll-none overscroll-y-contain bg-background transition-transform duration-300 md:hidden",
        "translate-y-0",
      )}
    >
      <button type="button" className="absolute top-4 right-4 text-fluid-xl hover:font-outline-1-black" onClick={() => toggle(false)}>
        X
      </button>
      <nav>
        <ul className="list-none text-center text-fluid-xl">
          <li>
            <Link href="/information" onClick={() => toggle(false)} className="hover:font-outline-1-black">
              Information
            </Link>
          </li>
          <li>
            <Link href="/" onClick={() => toggle(false)} className="hover:font-outline-1-black">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/garden" onClick={() => toggle(false)} className="hover:font-outline-1-black">
              Garden
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

// if path is /information, then return <Link href="/">Projects</Link> if its / return <Link href="/information">Information</Link>
// use next pathname to get the current path

function NavLink() {
  const pathname = usePathname();
  // or pathname starts with garden
  if (pathname === "/" || pathname.startsWith("/garden")) {
    return (
      <Link href="/information" className="hover:font-outline-1-black">
        Information
      </Link>
    );
  }
  return (
    <Link href="/" className="hover:font-outline-1-black">
      Projects
    </Link>
  );
}
