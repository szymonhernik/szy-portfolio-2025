"use client";

import type { MuxVideoAssetOwn } from "@/types/mux";

import MuxPlayerWrapper from "@/components/mux-player-wrapper";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { useCarousel } from "@/contexts/CarouselContext";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { type ElementRef, useEffect, useRef } from "react";
import FocusLock from "react-focus-lock";

import { NextButton, PrevButton, usePrevNextButtons } from "./carousel-embla/EmblaCarouselArrowButtons";
import { useDotButton } from "./carousel-embla/EmblaCarouselDotButton";

export default function FullScreenCarousel() {
  const { allSlides, currentSlideIndex, isFullScreen, closeFullScreen } = useCarousel();

  const dialogRef = useRef<ElementRef<"dialog">>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      startIndex: currentSlideIndex,
      loop: true,
    },
    [Fade()],
  );

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  // Update the scroll lock effect
  useEffect(() => {
    if (isFullScreen && dialogRef.current) {
      disableBodyScroll(dialogRef.current, {
        reserveScrollBarGap: true,
        allowTouchMove: (el) => {
          // Allow scrolling within content slides
          return el.classList.contains("overflow-auto");
        },
      });
    }

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isFullScreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen || !emblaApi) return;

      // Only handle Escape if there's no modal dialog open
      if (e.key === "Escape" && !document.querySelector('dialog[data-dialog-type="modal"][open]')) {
        closeFullScreen();
      }
      if (e.key === "ArrowRight") emblaApi.scrollNext();
      if (e.key === "ArrowLeft") emblaApi.scrollPrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, closeFullScreen, emblaApi]);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  if (!isFullScreen || !allSlides?.length) return null;

  const renderSlide = (slide: (typeof allSlides)[number]) => {
    if (!slide) return null;

    if ("image" in slide) {
      return (
        <div className="relative h-full w-full">
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
    <FocusLock returnFocus>
      <dialog
        open={isFullScreen}
        ref={dialogRef}
        data-dialog-type="carousel"
        className="fixed inset-0 z-50 h-screen w-screen overflow-y-auto overscroll-y-none bg-background"
      >
        <div className="relative h-full w-full">
          <button type="button" onClick={closeFullScreen} className="fixed top-0 right-0 z-[20] p-4 text-large hover:font-outline-1-black md:text-default">
            X
          </button>

          <div className="embla h-full w-3/4 max-w-screen">
            <div className="embla__viewport h-full" ref={emblaRef}>
              <div className="embla__container h-full">
                {allSlides.map((slide) => (
                  <div key={slide._key} className="embla__slide">
                    <div className="flex h-full w-full items-center justify-center">{renderSlide(slide)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute right-8 bottom-4">
              <div className="embla__dots">
                <div className="embla__buttons flex gap-2">
                  <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                  <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
                </div>
                <Link href="/garden?item=fresh-apples&direct=true">Open garden modal</Link>
                {/* {scrollSnaps.map((scrollSnap, index) => (
                <DotButton
                  key={scrollSnap}
                  onClick={() => onDotButtonClick(index)}
                  className={`embla__dot${index === selectedIndex ? " embla__dot--selected" : ""}`}
                />
              ))} */}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </FocusLock>
  );
}
