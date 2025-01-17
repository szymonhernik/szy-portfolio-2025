"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TestDirs({ testDirs }: { testDirs: string[] }) {
  const pathname = usePathname();

  return (
    <div className="flex gap-2">
      {testDirs.map((dir) => {
        const isActive = pathname === `/typography-tests/${dir}`;
        return (
          <Link
            key={dir}
            href={`/typography-tests/${dir}`}
            className={`px-2 py-1 rounded ${
              isActive
                ? "bg-gray-300 font-medium"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            Test {dir}
          </Link>
        );
      })}
    </div>
  );
}
