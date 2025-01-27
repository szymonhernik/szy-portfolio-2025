"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import PortableTextRenderer from "@/components/portable-text-renderer";
import { useCarousel } from "@/contexts/CarouselContext";

import Image from "next/image";

import MuxPlayerWrapper from "../mux-player-wrapper";

type CarouselBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "carousel" }>;

export default function Carousel({ caption, items }: CarouselBlock) {
  const { openFullScreen, allSlides } = useCarousel();

  if (!items?.length) return null;

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

  // Find the starting index for this carousel's slides within all slides
  const getGlobalIndex = (localIndex: number) => {
    if (!items?.[0]?._key || !allSlides) return localIndex;
    const firstSlideKey = items[0]._key;
    const globalStartIndex = allSlides.findIndex((slide) => slide._key === firstSlideKey);
    return globalStartIndex + localIndex;
  };

  return (
    <div className="relative w-full">
      {/* <EmblaCarousel onSlideClick={(index) => openFullScreen(allSlides, getGlobalIndex(index))}>{items.map((slide) => renderSlide(slide))}</EmblaCarousel> */}
    </div>
  );
}
