"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  return (
    <div className="fixed top-4 right-4 z-50">
      <nav className="">
        <h1>
          <NavLink />
        </h1>
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
