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
import { useEffect, useLayoutEffect, useRef } from "react";
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
  useLayoutEffect(() => {
    if (isFullScreen && dialogRef.current) {
      // Store original requestAnimationFrame
      const storedRequestAnimationFrame = window.requestAnimationFrame;

      // Temporarily override requestAnimationFrame
      window.requestAnimationFrame = () => 42;

      disableBodyScroll(dialogRef.current, {
        reserveScrollBarGap: true,
        allowTouchMove: (el) => {
          return el.classList.contains("overflow-auto");
        },
      });

      // Restore original requestAnimationFrame
      window.requestAnimationFrame = storedRequestAnimationFrame;
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
      const aspectRatio = slide.image?.asset?.metadata?.dimensions?.aspectRatio ? decimalToRatio(slide.image.asset.metadata.dimensions.aspectRatio) : "16/9";

      return (
        <div
          className="relative h-auto max-h-[90vh] w-full"
          style={{
            aspectRatio: aspectRatio,
            maxWidth: `calc(90vh * ${aspectRatio
              .split("/")
              .map(Number)
              .reduce((a, b) => a / b)
              .toString()})`,
          }}
        >
          <Image
            src={slide.image?.asset?.url || ""}
            alt={slide.image?.alt || ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain object-left-top"
            placeholder="blur"
            blurDataURL={slide.image?.asset?.metadata?.lqip || ""}
            // priority
          />
        </div>
      );
    }

    if ("video" in slide && (slide.video?.asset as unknown as MuxVideoAssetOwn)?.playbackId) {
      const aspectRatioMobile = (slide.mobileVideo?.asset as unknown as MuxVideoAssetOwn)?.aspectRatio?.replace(":", "/") ?? "16/9"; // Default fallback ratio

      const aspectRatio = (slide.video?.asset as unknown as MuxVideoAssetOwn).aspectRatio?.replace(":", "/");

      return (
        <>
          {slide.mobileVideo?.asset ? (
            <>
              <div
                className="relative flex max-h-[70dvh] w-auto max-w-full items-center pb-8 md:hidden"
                style={{
                  aspectRatio: aspectRatioMobile,
                  minHeight: "70dvh",
                }}
              >
                <MuxPlayerWrapper video={slide.mobileVideo.asset as unknown as MuxVideoAssetOwn} />
              </div>
              <div className="relative hidden max-h-[80vh] w-full overflow-hidden md:block" style={{ aspectRatio: aspectRatio }}>
                <MuxPlayerWrapper video={slide.video?.asset as unknown as MuxVideoAssetOwn} />
              </div>
            </>
          ) : (
            <div className="relative max-h-[80vh] w-full overflow-hidden" style={{ aspectRatio: aspectRatio }}>
              <MuxPlayerWrapper video={slide.video?.asset as unknown as MuxVideoAssetOwn} />
            </div>
          )}
        </>
      );
    }

    if ("content" in slide) {
      return <div className="h-full w-full overflow-auto text-fluid-xl">{slide.content && <PortableTextRenderer value={slide.content} />}</div>;
    }

    return null;
  };

  return (
    <FocusLock returnFocus>
      <dialog
        open={isFullScreen}
        ref={dialogRef}
        data-dialog-type="carousel"
        className="fixed inset-0 z-[300] h-screen w-screen overflow-y-auto overscroll-y-contain bg-background"
      >
        <div className="relative h-full w-full">
          <button
            type="button"
            onClick={closeFullScreen}
            className="fixed top-0 right-0 z-[310] p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base"
          >
            X
          </button>

          <div className="embla h-full w-full max-w-screen md:w-3/4">
            <div className="embla__viewport h-full" ref={emblaRef}>
              <div className="embla__container h-full">
                {allSlides.map((slide) => (
                  <div key={slide._key} className="embla__slide ">
                    <div className="flex h-full w-full items-center justify-center px-4 py-4 md:items-start md:justify-start md:pr-0">{renderSlide(slide)}</div>
                  </div>
                ))}
              </div>

              {/* Caption display logic */}
              {allSlides[selectedIndex]?.caption ? (
                <div className="fixed inset-x-4 bottom-16 text-center text-small md:bottom-4 md:left-4 md:mb-0 md:max-w-[80%] md:text-left [&>p]:mb-0 ">
                  <PortableTextRenderer value={allSlides[selectedIndex].caption} />
                </div>
              ) : (
                allSlides[selectedIndex]?.defaultCaption && (
                  <p className="fixed inset-x-4 bottom-16 text-center text-small md:bottom-4 md:left-4 md:mb-0 md:max-w-[80%] md:text-left [&>p]:mb-0 ">
                    {allSlides[selectedIndex].defaultCaption}
                  </p>
                )
              )}
            </div>

            <div className="absolute inset-x-4 bottom-4 text-center md:right-2 md:bottom-2 md:left-auto">
              <div className="embla__dots">
                <div className="embla__buttons flex justify-center gap-2 md:justify-start">
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
