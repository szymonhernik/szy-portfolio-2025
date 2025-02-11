"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const [windowHeight, setWindowHeight] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonHeight, setButtonHeight] = useState(0);

  useEffect(() => {
    // Set initial height
    setWindowHeight(window.innerHeight);
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.offsetHeight);
    }

    // Update heights on resize
    function handleResize() {
      setWindowHeight(window.innerHeight);
      if (buttonRef.current) {
        setButtonHeight(buttonRef.current.offsetHeight);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        style={
          {
            "--window-height": `${windowHeight}px`,
            "--button-height": `${buttonHeight}px`,
          } as React.CSSProperties
        }
        className={clsx(
          "fixed top-4 right-4 z-[100] overscroll-none pl-4 text-fluid-xl transition-transform duration-300 md:hidden",
          isOpen ? "translate-y-[calc(var(--window-height)_-_var(--button-height)_-_32px)]" : "translate-y-0",
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
  const initialScrollRef = useRef<number | null>(null);
  const isBodyLockedRef = useRef(false);
  const isClosingRef = useRef(false);

  // Handle scroll locking
  useLayoutEffect(() => {
    if (isOpen) {
      if (!isBodyLockedRef.current && initialScrollRef.current === null) {
        initialScrollRef.current = window.scrollY;
        isBodyLockedRef.current = true;

        document.body.style.position = "fixed";
        document.body.style.top = `-${initialScrollRef.current}px`;
        document.body.style.width = "100%";
        document.body.style.overflow = "hidden";
      }
    } else {
      if (isBodyLockedRef.current) {
        const scrollTarget = initialScrollRef.current;

        initialScrollRef.current = null;
        isBodyLockedRef.current = false;

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";

        if (scrollTarget !== null) {
          window.scrollTo({
            top: scrollTarget,
            behavior: "instant",
          });
        }
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent double-closing
    if (isClosingRef.current) return;
    isClosingRef.current = true;

    toggle(false);

    // Reset the closing ref after a short delay
    setTimeout(() => {
      isClosingRef.current = false;
    }, 100);
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-[90] flex h-[100dvh] w-screen flex-col items-center justify-center overscroll-none bg-background transition-transform duration-300 md:hidden",
        "translate-y-0",
      )}
      onTouchMove={(e) => e.preventDefault()}
    >
      <button
        type="button"
        className="absolute top-0 right-0 z-[100] p-4 text-fluid-xl hover:font-outline-1-black"
        onClick={handleClose}
        onTouchEnd={handleClose}
      >
        X
      </button>
      <nav>
        <ul className="list-none space-y-8 text-center text-fluid-xl">
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
