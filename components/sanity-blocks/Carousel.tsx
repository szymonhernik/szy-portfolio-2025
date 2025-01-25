"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import PortableTextRenderer from "@/components/portable-text-renderer";

import Image from "next/image";
import { useState } from "react";

import MuxPlayerWrapper from "../mux-player-wrapper";

type CarouselBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "carousel" }>;

export default function Carousel({ caption, items }: CarouselBlock) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === (items?.length || 0) - 1 ? 0 : prevIndex + 1));
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? (items?.length || 0) - 1 : prevIndex - 1));
  };

  const renderSlide = (slide: NonNullable<CarouselBlock["items"]>[number]) => {
    if (!slide) return null;

    if ("image" in slide) {
      return (
        <div className="relative h-[400px] w-full">
          <Image
            src={slide.image?.asset?.url || ""}
            alt={slide.image?.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
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
        <div className="relative h-[400px] w-full">
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
        <div className="h-[400px] w-full bg-gray-100 p-4">
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

  if (!items?.length) return null;

  return (
    <div className="relative w-full">
      {/* {caption && <h3 className="">{caption}</h3>} */}

      <div className="relative mt-4 mb-4 overflow-hidden">
        {renderSlide(items[currentIndex])}

        {/* Navigation buttons */}
        <button
          type="button"
          onClick={previousSlide}
          className="-translate-y-1/2 absolute top-1/2 left-2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
          aria-label="Previous slide"
        >
          &lt;
        </button>

        <button
          onClick={nextSlide}
          type="button"
          className="-translate-y-1/2 absolute top-1/2 right-2 rounded-full bg-white/80 p-2 shadow-lg hover:bg-white"
          aria-label="Next slide"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}
