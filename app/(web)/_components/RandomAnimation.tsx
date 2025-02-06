"use client";

import { videoLibrary } from "@/data/videoLibrary";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RandomAnimation({
  expectedPath,
}: {
  expectedPath: string;
}) {
  const pathname = usePathname();
  const [randomVideo, setRandomVideo] = useState(
    videoLibrary[Math.floor(Math.random() * videoLibrary.length)],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally changing video on path change
  useEffect(() => {
    setRandomVideo(
      videoLibrary[Math.floor(Math.random() * videoLibrary.length)],
    );
  }, [pathname]);

  // Don't render if paths don't match
  if (pathname !== expectedPath) {
    return null;
  }

  // Generate random positions: top 0-50%, left 0-70% of viewport
  const randomPosition = {
    top: `${Math.floor(Math.random() * 30)}vh`,
    left: `${Math.floor(Math.random() * 70)}vw`,
  };

  const videoSize =
    randomVideo.size === "lightweight" ? "max-w-[20vw]" : "max-w-[10vw]";

  return (
    <div className="absolute z-[0] " style={randomPosition}>
      <video
        src={randomVideo.url}
        autoPlay
        muted
        controls={false}
        className={`max-h-[30vh] ${videoSize}`}
      />
    </div>
  );
}
