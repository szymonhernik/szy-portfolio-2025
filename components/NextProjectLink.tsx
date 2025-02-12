"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NextProject =
  | {
      title: string | null;
      slug: string | null;
    }
  | undefined;

export default function NextProjectLink({
  nextProject,
}: {
  nextProject: NextProject;
}) {
  const [bottomOffset, setBottomOffset] = useState(16); // 4rem default

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollPosition = window.scrollY;
      const distanceFromBottom =
        documentHeight - (scrollPosition + windowHeight);

      // When we're within 140px of the bottom, adjust the position
      if (distanceFromBottom < 140) {
        // Scale the movement to reach 180px
        const newOffset = Math.min(180, 16 + (140 - distanceFromBottom) * 1.5);
        setBottomOffset(newOffset);
      } else {
        setBottomOffset(16);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return nextProject ? (
    <div
      className={`max-lg:hidden lg:fixed lg:right-4 lg:z-[0] lg:ml-auto lg:w-fit`}
      style={{ bottom: `${bottomOffset}px` }}
    >
      {nextProject && (
        <div>
          Next:{" "}
          <Link
            href={`/projects/${nextProject.slug}`}
            className="text-secondary hover:font-outline-1-secondary"
          >
            {nextProject.title}
          </Link>
        </div>
      )}
    </div>
  ) : null;
}
