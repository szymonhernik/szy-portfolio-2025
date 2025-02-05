"use client";

import type { MuxVideoAssetOwn } from "@/types/mux";
import type { ComponentPropsWithRef, ElementRef } from "react";

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

import { ArrowLeft, ArrowRight } from "./arrows";

export default function FullScreenCarouselSimple() {
  const { allSlides, currentSlideIndex, isFullScreen, closeFullScreen } =
    useCarousel();

  const dialogRef = useRef<ElementRef<"dialog">>(null);

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
      if (!isFullScreen) return;

      // Only handle Escape if there's no modal dialog open
      if (
        e.key === "Escape" &&
        !document.querySelector('dialog[data-dialog-type="modal"][open]')
      ) {
        closeFullScreen();
      }
      if (e.key === "ArrowRight") {
        console.log("ArrowRight");
      }
      if (e.key === "ArrowLeft") {
        console.log("ArrowLeft");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen, closeFullScreen]);

  if (!isFullScreen || !allSlides?.length) return null;

  const renderSlide = (slide: (typeof allSlides)[number]) => {
    if (!slide) return null;
    if ("image" in slide) {
      return <div>Image</div>;
    }

    if (
      "video" in slide &&
      (slide.video?.asset as unknown as MuxVideoAssetOwn)?.playbackId
    ) {
      return <div>Video</div>;
    }

    if ("content" in slide) {
      return <div>Content</div>;
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

          <div className=" h-full w-full max-w-screen md:w-3/4">
            {allSlides.map((slide) => (
              <div key={slide._key}>{renderSlide(slide)}</div>
            ))}
          </div>

          <div className="absolute inset-x-4 bottom-4 text-center md:right-2 md:bottom-2 md:left-auto">
            <div className="embla__buttons flex justify-center gap-2 md:justify-start">
              <PrevButton />
              <NextButton />
            </div>
          </div>
        </div>
      </dialog>
    </FocusLock>
  );
}

const PrevButton = () => {
  return (
    <button className="" type="button">
      <ArrowLeft width={16} height={16} />
    </button>
  );
};

function NextButton() {
  return (
    <button className="" type="button">
      <ArrowRight width={16} height={16} />
    </button>
  );
}
