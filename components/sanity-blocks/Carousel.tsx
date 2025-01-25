"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import PortableTextRenderer from "@/components/portable-text-renderer";

import Image from "next/image";

import MuxPlayerWrapper from "../mux-player-wrapper";

type CarouselBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "carousel" }>;

export default function Carousel({ caption, items }: CarouselBlock) {
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

  return (
    <div className="relative w-full">
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
        {items.map((slide) => (
          <div key={slide._key} className="w-full flex-none snap-center">
            {renderSlide(slide)}
          </div>
        ))}
      </div>
    </div>
  );
}
