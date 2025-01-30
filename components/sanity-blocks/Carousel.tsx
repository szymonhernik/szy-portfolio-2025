"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import PortableTextRenderer from "@/components/portable-text-renderer";
import { useCarousel } from "@/contexts/CarouselContext";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

import { useDotButton } from "../carousel-embla/EmblaCarouselDotButton";
import MuxPlayerWrapper from "../mux-player-wrapper";

type CarouselBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "carousel" }> & {
  defaultCaption?: string;
};

export default function Carousel({ defaultCaption, items }: CarouselBlock) {
  const { openFullScreen, allSlides } = useCarousel();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  // Calculate aspect ratio based on first item
  const getAspectRatio = () => {
    if (!items?.[0]) return "3 / 2"; // default fallback
    const firstSlide = items[0];

    if ("image" in firstSlide && firstSlide.image?.asset?.metadata?.dimensions) {
      const { width, height } = firstSlide.image.asset.metadata.dimensions;
      return `${width} / ${height}`;
    }

    if ("video" in firstSlide) {
      return "16 / 9"; // default video aspect ratio
    }

    return "3 / 2"; // fallback for content slides
  };

  // Add the dots hook
  const { selectedIndex } = useDotButton(emblaApi);

  if (!items?.length) return null;

  const renderSlide = (slide: NonNullable<CarouselBlock["items"]>[number]) => {
    if (!slide) return null;

    if ("image" in slide) {
      return (
        <div className="relative h-full ">
          <Image
            src={slide.image?.asset?.url || ""}
            alt={slide.image?.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
            className="object-contain object-left-top"
            placeholder="blur"
            blurDataURL={slide.image?.asset?.metadata?.lqip || ""}
          />
          {/* {slide.caption && (
            <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
              <PortableTextRenderer value={slide.caption} />
            </div>
          )} */}
        </div>
      );
    }

    if ("video" in slide && (slide.video?.asset as unknown as MuxVideoAssetOwn)?.playbackId) {
      return (
        <div className="relative h-full w-full">
          <MuxPlayerWrapper
            // className="h-full object-contain"
            video={slide.video?.asset as unknown as MuxVideoAssetOwn}
          />
          {/* {slide.caption && (
            <div className="absolute right-0 bottom-0 left-0 bg-black/50 p-2 text-white">
              <PortableTextRenderer value={slide.caption} />
            </div>
          )} */}
        </div>
      );
    }

    if ("content" in slide) {
      return (
        <div className="h-full w-full p-4">
          {slide.content && <PortableTextRenderer value={slide.content} />}
          {/* {slide.caption && (
            <div className="mt-4 text-gray-600 text-sm">
              <PortableTextRenderer value={slide.caption} />
            </div>
          )} */}
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
    <div className="relative my-4 w-full">
      <div className="embla flex flex-col gap-2">
        <div className="embla__viewport" ref={emblaRef} style={{ aspectRatio: getAspectRatio() }}>
          <div className="embla__container ">
            {items.map((slide, index) => (
              <div key={slide._key} className="embla__slide overflow-hidden">
                {renderSlide(slide)}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-small lg:text-xs">
          <button className="text-secondary" type="button" onClick={() => openFullScreen(allSlides, getGlobalIndex(selectedIndex))}>
            Click to view full-screen
          </button>
          <span className="">{`${selectedIndex + 1}–${items.length}`}</span>
        </div>
      </div>
    </div>
  );
}
