"use client";

import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayerWrapper from "@/components/mux-player-wrapper";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { useCarousel } from "@/contexts/CarouselContext";

import Image from "next/image";
import { useEffect } from "react";

export default function FullScreenCarousel() {
  const { allSlides, currentSlideIndex, isFullScreen, closeFullScreen, nextSlide, previousSlide } = useCarousel();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen) return;
      if (e.key === "Escape") closeFullScreen();
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") previousSlide();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, closeFullScreen, nextSlide, previousSlide]);

  if (!isFullScreen || !allSlides?.length) return null;

  const currentSlide = allSlides[currentSlideIndex];

  const renderSlide = (slide: typeof currentSlide) => {
    if (!slide) return null;

    if ("image" in slide) {
      return (
        <div className="relative h-screen w-full">
          <Image
            src={slide.image?.asset?.url || ""}
            alt={slide.image?.alt || ""}
            fill
            sizes="100vw"
            className="object-contain"
            placeholder="blur"
            blurDataURL={slide.image?.asset?.metadata?.lqip || ""}
          />
          {slide.caption && (
            <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
              <PortableTextRenderer value={slide.caption} />
            </div>
          )}
        </div>
      );
    }

    if ("video" in slide && (slide.video?.asset as unknown as MuxVideoAssetOwn)?.playbackId) {
      return (
        <div className="relative h-screen w-full">
          <MuxPlayerWrapper video={slide.video?.asset as unknown as MuxVideoAssetOwn} />
          {slide.caption && (
            <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
              <PortableTextRenderer value={slide.caption} />
            </div>
          )}
        </div>
      );
    }

    if ("content" in slide) {
      return (
        <div className="h-screen w-full overflow-auto bg-gray-100 p-4">
          {slide.content && <PortableTextRenderer value={slide.content} />}
          {slide.caption && (
            <div className="mt-4 text-gray-600 text-sm">
              <PortableTextRenderer value={slide.caption} />
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative h-full w-full">
        <button type="button" onClick={closeFullScreen} className="absolute top-4 right-4 z-10 p-2 text-white">
          Close
        </button>
        <button type="button" onClick={previousSlide} className="-translate-y-1/2 absolute top-1/2 left-4 z-10 p-2 text-white">
          Previous
        </button>
        <button type="button" onClick={nextSlide} className="-translate-y-1/2 absolute top-1/2 right-4 z-10 p-2 text-white">
          Next
        </button>
        <div className="flex h-full w-full items-center justify-center">{renderSlide(currentSlide)}</div>
      </div>
    </div>
  );
}
