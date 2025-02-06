"use client";

import type { MuxVideoAssetOwn } from "@/types/mux";
import type { ElementRef } from "react";

import { useCarousel } from "@/contexts/CarouselContext";

import { clearAllBodyScrollLocks, disableBodyScroll } from "body-scroll-lock";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import FocusLock from "react-focus-lock";

import { ArrowLeft, ArrowRight } from "../arrows";
import MuxPlayerWrapper from "../mux-player-wrapper";
import PortableTextRenderer from "../portable-text-renderer";
import { ImageSlide } from "./CarouselSimple";

export default function FullScreenCarouselSimple() {
  const { allSlides, currentSlideIndex, isFullScreen, closeFullScreen } = useCarousel();

  const dialogRef = useRef<ElementRef<"dialog">>(null);

  const [currentSlide, setCurrentSlide] = useState(currentSlideIndex || 0);

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
    if (isFullScreen) {
      setCurrentSlide(currentSlideIndex || 0);
    }
  }, [isFullScreen, currentSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen) return;

      // Only handle Escape if there's no modal dialog open
      if (e.key === "Escape" && !document.querySelector('dialog[data-dialog-type="modal"][open]')) {
        closeFullScreen();
      }
      if (e.key === "ArrowRight") {
        handleNext();
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, closeFullScreen]);

  // Add navigation handlers
  const handleNext = () => {
    setCurrentSlide((prev) => (prev === allSlides.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? allSlides.length - 1 : prev - 1));
  };

  if (!isFullScreen || !allSlides?.length) return null;

  const renderSlide = (slide: (typeof allSlides)[number]) => {
    if (!slide) return null;
    if ("image" in slide && slide.image?.asset?.url) {
      return <ImageSlide image={slide.image} />;
    }

    if ("video" in slide && (slide.video?.asset as unknown as MuxVideoAssetOwn)?.playbackId) {
      const aspectRatio = (slide.video?.asset as unknown as MuxVideoAssetOwn).aspectRatio?.replace(":", "/");
      console.log("AUDIO ALLOWED?:", slide.allowAudio);

      return (
        <div className="relative max-h-[80vh] w-full overflow-hidden" style={{ aspectRatio: aspectRatio }}>
          <MuxPlayerWrapper allowAudio={slide.allowAudio} video={slide.video?.asset as unknown as MuxVideoAssetOwn} />
        </div>
      );
    }

    if ("content" in slide) {
      if (!slide.content) return null;
      return (
        <div className="h-full w-full overflow-auto text-fluid-xl">
          <PortableTextRenderer value={slide.content} />
        </div>
      );
    }

    return null;
  };

  return (
    <dialog
      open={isFullScreen}
      ref={dialogRef}
      aria-modal="true"
      data-dialog-type="carousel"
      className="fixed inset-0 z-[300] h-screen w-screen overflow-y-auto overscroll-y-contain bg-background"
    >
      <FocusLock>
        <div className="relative h-full w-full bg-background">
          <button
            type="button"
            onClick={closeFullScreen}
            aria-label="Close fullscreen carousel"
            className="fixed top-0 right-0 z-[310] p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base"
          >
            X
          </button>

          <div className="h-full max-h-[90vh] w-full max-w-screen overflow-hidden lg:w-3/4">
            <div
              className="flex h-full"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {allSlides.map((slide) => (
                <div key={slide._key} className="h-full w-full flex-shrink-0 p-4">
                  {renderSlide(slide)}
                </div>
              ))}
            </div>
          </div>

          <div className="fixed right-4 bottom-4 left-4 z-[410] flex items-center justify-between gap-2">
            <div className="text-small md:text-small-md [&>p]:mb-0">
              {allSlides[currentSlide]?.caption ? (
                <PortableTextRenderer value={allSlides[currentSlide].caption} />
              ) : (
                allSlides[currentSlide]?.defaultCaption && <p className="text-small [ md:text-small-md">{allSlides[currentSlide].defaultCaption}</p>
              )}
            </div>
            <div className=" flex justify-center gap-3 md:justify-start">
              <PrevButton onClick={handlePrev} />
              <NextButton onClick={handleNext} />
            </div>
          </div>
        </div>
      </FocusLock>
    </dialog>
  );
}

const PrevButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="stroke-black hover:stroke-[5px]" type="button" onClick={onClick} aria-label="Previous slide">
      <ArrowLeft width={16} height={16} />
    </button>
  );
};

function NextButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="stroke-black hover:stroke-[5px] focus:outline-none focus:ring-2 focus:ring-black"
      type="button"
      onClick={onClick}
      aria-label="Next slide"
    >
      <ArrowRight width={16} height={16} />
    </button>
  );
}
