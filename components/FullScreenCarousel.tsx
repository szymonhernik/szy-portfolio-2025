"use client";

import type { MuxVideoAssetOwn } from "@/types/mux";
import type { ElementRef } from "react";

import MuxPlayerWrapper from "@/components/mux-player-wrapper";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { useCarousel } from "@/contexts/CarouselContext";
import { decimalToRatio } from "@/lib/calculating";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
      // this comes like this: 1.4361851332398317
      // we need to convert it to this: x / y
      const aspectRatio = slide.image?.asset?.metadata?.dimensions?.aspectRatio ? decimalToRatio(slide.image.asset.metadata.dimensions.aspectRatio) : "16/9";

      return (
        <div className="relative max-h-[90vh] w-full overflow-hidden" style={{ aspectRatio: aspectRatio }}>
          <Image
            src={slide.image?.asset?.url || ""}
            alt={slide.image?.alt || ""}
            fill
            sizes="100vw"
            className={"object-contain object-left-top "}
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
      const aspectRatio = (slide.video?.asset as unknown as MuxVideoAssetOwn).aspectRatio?.replace(":", "/");

      return (
        <div className="relative max-h-[90vh] w-full overflow-hidden" style={{ aspectRatio: aspectRatio }}>
          <MuxPlayerWrapper video={slide.video?.asset as unknown as MuxVideoAssetOwn} />
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
        <div className="h-screen w-full overflow-auto text-fluid-xl">
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

  return (
    <FocusLock returnFocus>
      <dialog
        open={isFullScreen}
        ref={dialogRef}
        data-dialog-type="carousel"
        className="fixed inset-0 z-[300] h-screen w-screen overflow-y-auto overscroll-y-none bg-background"
      >
        <div className="relative h-full w-full">
          <button type="button" onClick={closeFullScreen} className="fixed top-0 right-0 p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base">
            X
          </button>

          <div className="embla h-full w-full max-w-screen md:w-3/4">
            <div className="embla__viewport h-full" ref={emblaRef}>
              <div className="embla__container h-full">
                {allSlides.map((slide) => (
                  <div key={slide._key} className="embla__slide">
                    <div className="flex h-full w-full flex-col justify-center py-4 pr-4 pl-4 md:justify-start md:pr-0">{renderSlide(slide)}</div>
                  </div>
                ))}
              </div>

              {/* Caption display logic */}
              {allSlides[selectedIndex]?.caption ? (
                <div className="fixed bottom-4 left-4 mb-0 text-xs [&>p]:mb-0">
                  <PortableTextRenderer value={allSlides[selectedIndex].caption} />
                </div>
              ) : (
                allSlides[selectedIndex]?.defaultCaption && <p className="fixed bottom-4 left-4 mb-0 text-xs">{allSlides[selectedIndex].defaultCaption}</p>
              )}
            </div>

            <div className="absolute right-2 bottom-2">
              <div className="embla__dots">
                <div className="embla__buttons flex gap-2 ">
                  <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} className="p-2" />
                  <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} className="p-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </FocusLock>
  );
}
