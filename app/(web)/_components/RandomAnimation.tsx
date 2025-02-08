"use client";

import { videoLibrary } from "@/data/videoLibrary";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Video = {
  id: number;
  url: string;
  size: "lightweight" | "heavyweight";
};

export default function RandomAnimation({
  expectedPath,
}: {
  expectedPath: string;
}) {
  const pathname = usePathname();
  const [randomVideo, setRandomVideo] = useState<Video | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally changing video on path change
  useEffect(() => {
    setRandomVideo(
      videoLibrary[Math.floor(Math.random() * videoLibrary.length)] as Video,
    );
  }, [pathname]);

  // Don't render if paths don't match
  if (pathname !== expectedPath || !randomVideo) {
    return null;
  }

  // Generate random positions: top 0-50%, left 0-70% of viewport
  const randomPosition = {
    top: `${Math.floor(Math.random() * 30)}vh`,
    left: `${Math.floor(Math.random() * 70)}vw`,
  };

  const videoSize =
    randomVideo.size === "lightweight"
      ? "max-w-[240px] max-h-[240px]"
      : "max-w-[140px] max-h-[140px]";

  console.log("randomVideo", randomVideo);

  return (
    <div className="absolute z-[0] mix-blend-darken " style={randomPosition}>
      <video
        src={randomVideo.url}
        playsInline
        autoPlay
        muted
        controls={false}
        className={`${videoSize}`}
      />
    </div>
  );
}
