"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import PortableTextRenderer from "@/components/portable-text-renderer";
import { useCarousel } from "@/contexts/CarouselContext";
import { decimalToRatio } from "@/lib/calculating";

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
  // Add scroll methods
  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  // Calculate aspect ratio based on first item
  const getAspectRatio = () => {
    if (!items?.[0]) return "3 / 2"; // default fallback
    const firstSlide = items[0];

    if ("image" in firstSlide && firstSlide.image?.asset?.metadata?.dimensions) {
      const { width, height } = firstSlide.image.asset.metadata.dimensions;
      return `${width} / ${height}`;
    }

    if ("video" in firstSlide) {
      // replace : with /
      // @ts-ignore
      const aspectRatio = firstSlide.video?.asset?.aspectRatio
        ? // @ts-ignore
          firstSlide.video.asset.aspectRatio.replace(":", " / ")
        : "16/9";
      return aspectRatio;
    }

    return "3 / 2"; // fallback for content slides
  };

  // Add the dots hook
  const { selectedIndex } = useDotButton(emblaApi);

  if (!items?.length) return null;

  const renderSlide = (slide: NonNullable<CarouselBlock["items"]>[number]) => {
    if (!slide) return null;

    if ("image" in slide) {
      const aspectRatio = slide.image?.asset?.metadata?.dimensions?.aspectRatio ? decimalToRatio(slide.image.asset.metadata.dimensions.aspectRatio) : "16/9";
      return (
        <div
          className="relative h-full max-w-full"
          style={{
            aspectRatio: aspectRatio,
            // maxWidth: `calc(90vh * ${aspectRatio
            //   .split("/")
            //   .map(Number)
            //   .reduce((a, b) => a / b)
            //   .toString()})`,
          }}
        >
          <Image
            src={slide.image?.asset?.url || ""}
            alt={slide.image?.alt || ""}
            width={1000}
            height={1000}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="h-full w-full object-contain object-left-top"
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
    <div className="relative my-4 w-full max-w-screen-lg ">
      <div className="embla flex max-h-[800px] flex-col gap-2">
        <div className="embla__viewport" ref={emblaRef} style={{ aspectRatio: getAspectRatio() }}>
          <div className="embla__container ">
            {items.map((slide, index) => (
              <div key={slide._key} className="embla__slide overflow-hidden">
                {renderSlide(slide)}
              </div>
            ))}
          </div>

          {/* Left Arrow Overlay */}
          <div className="absolute top-0 bottom-0 left-0 flex w-1/4 items-center justify-start hover:opacity-100 lg:opacity-0 ">
            <button
              type="button"
              onClick={scrollPrev}
              className="m-4 flex h-10 w-10 items-center justify-center rounded-full p-2 text-white"
              aria-label="Previous slide"
            >
              <span className="h-3 w-3 rotate-[-135deg] border-white border-t-2 border-r-2 mix-blend-difference" />
            </button>
          </div>

          {/* Right Arrow Overlay */}
          <div className="absolute top-0 right-0 bottom-0 flex w-1/4 items-center justify-end hover:opacity-100 lg:opacity-0 ">
            <button
              type="button"
              onClick={scrollNext}
              className="m-4 flex h-10 w-10 items-center justify-center rounded-full p-2 text-white"
              aria-label="Next slide"
            >
              <span className="h-3 w-3 rotate-45 border-white border-t-2 border-r-2 mix-blend-difference" />
            </button>
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
