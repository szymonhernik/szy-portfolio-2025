"use client";

import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayerWrapper from "@/components/mux-player-wrapper";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { useCarousel } from "@/contexts/CarouselContext";

import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect } from "react";

import { DotButton, useDotButton } from "./carousel-embla/EmblaCarouselDotButton";

export default function FullScreenCarousel() {
  const { allSlides, currentSlideIndex, isFullScreen, closeFullScreen } = useCarousel();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: currentSlideIndex,
    loop: true,
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen || !emblaApi) return;
      if (e.key === "Escape") closeFullScreen();
      if (e.key === "ArrowRight") emblaApi.scrollNext();
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, closeFullScreen, emblaApi]);

  if (!isFullScreen || !allSlides?.length) return null;

  const renderSlide = (slide: (typeof allSlides)[number]) => {
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
    <div className="fixed inset-0 z-50 bg-background">
      <div className="relative h-full w-full">
        <button type="button" onClick={closeFullScreen} className="absolute top-4 right-4 z-10 p-2">
          Close
        </button>

        <div className="embla h-full">
          <div className="embla__viewport h-full" ref={emblaRef}>
            <div className="embla__container h-full">
              {allSlides.map((slide, index) => (
                <div key={slide._key} className="embla__slide">
                  <div className="flex h-full w-full items-center justify-center">{renderSlide(slide)}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="embla__controls -translate-x-1/2 absolute bottom-4 left-1/2">
            <div className="embla__dots">
              {scrollSnaps.map((scrollSnap, index) => (
                <DotButton
                  key={scrollSnap}
                  onClick={() => onDotButtonClick(index)}
                  className={`embla__dot${index === selectedIndex ? " embla__dot--selected" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
