"use client";

import type { MuxVideoAssetOwn } from "@/types/mux";
import type { ElementRef } from "react";

import { ArrowLeft, ArrowRight } from "@/components/arrows";
import MuxPlayerWrapper from "@/components/mux-player-wrapper";
import PortableTextRenderer from "@/components/portable-text-renderer";
import { ImageSlide } from "@/components/sanity-blocks/CarouselSimple";
import { useCarousel } from "@/contexts/CarouselContext";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export function FullCarouselModal() {
  const { allSlides, currentSlideIndex, isFullScreen, closeFullScreen } =
    useCarousel();

  // dialog ref to control the dialog open state
  const dialogRef = useRef<ElementRef<"dialog">>(null);
  const scrollableRef = useRef<ElementRef<"div">>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // content ref to disable body scroll

  const [mounted, setMounted] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(currentSlideIndex || 0);
  useEffect(() => {
    if (isFullScreen) {
      setCurrentSlide(currentSlideIndex || 0);
    }
  }, [isFullScreen, currentSlideIndex]);
  // Memoize navigation handlers
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev === allSlides.length - 1 ? 0 : prev + 1));
  }, [allSlides.length]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? allSlides.length - 1 : prev - 1));
  }, [allSlides.length]);

  const handleDismiss = useCallback(() => {
    dialogRef.current?.close();
    closeFullScreen();
  }, [closeFullScreen]);

  // Slide rendering logic with focus management
  const renderSlide = (
    slide: (typeof allSlides)[number],
    isVisible: boolean,
  ) => {
    if (!slide) return null;
    if ("image" in slide && slide.image?.asset?.url) {
      return (
        <ImageSlide
          image={slide.image}
          heightClass="h-auto lg:h-full"
          sizes="(max-width: 768px) 100vw, 70vw"
        />
      );
    }

    if (
      "video" in slide &&
      (slide.video?.asset as unknown as MuxVideoAssetOwn)?.playbackId
    ) {
      const aspectRatio = (
        slide.video?.asset as unknown as MuxVideoAssetOwn
      ).aspectRatio?.replace(":", "/");

      return (
        <div
          className="relative max-h-[80vh] w-full overflow-hidden"
          style={{ aspectRatio: aspectRatio }}
        >
          <MuxPlayerWrapper
            allowAudio={slide.allowAudio}
            video={slide.video?.asset as unknown as MuxVideoAssetOwn}
            // Only hide from screen readers when not visible, keep tab index
            {...(!isVisible && {
              "aria-hidden": true,
            })}
          />
        </div>
      );
    }

    if ("content" in slide) {
      if (!slide.content) return null;
      return (
        <div className="h-full w-full overflow-auto text-fluid-lg md:text-fluid-xl">
          <PortableTextRenderer value={slide.content} />
        </div>
      );
    }

    return null;
  };

  // Now the effect can safely depend on these stable functions
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog?.open) {
      dialog?.showModal();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Only prevent default for Escape key
      if (e.key === "Escape") {
        e.preventDefault();
        handleDismiss();
      }
      // Don't prevent default for arrow keys to allow video controls to work
      if (e.key === "ArrowRight") {
        handleNext();
      }
      if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };

    // Add the event listener to the window instead of the dialog
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDismiss, handleNext, handlePrev]);

  // Handle scroll locking
  useLayoutEffect(() => {
    if (isFullScreen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);

      // Lock the body
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";

      // Store scrollY in a ref for cleanup
      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY); // Use the captured scrollY value instead of state
      };
    }
  }, [isFullScreen]); // Remove scrollPosition dependency

  // Add mounting effect
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Only render if mounted and in browser environment
  if (!mounted) return null;

  const modalRoot = document.getElementById("full-screen-carousel-root");
  if (!modalRoot) return null; // Change error to silent return

  return createPortal(
    <dialog
      ref={dialogRef}
      data-dialog-type="modal"
      className="z-[300] m-0 h-[100dvh] w-screen bg-white p-4 lg:bg-background"
      onClose={handleDismiss}
    >
      <div ref={scrollableRef} className="relative h-full w-full overflow-auto">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close fullscreen carousel"
          className="fixed top-0 right-0 z-[310] p-4 text-fluid-xl hover:font-outline-1-black md:text-fluid-base"
        >
          X
        </button>

        <div className=" h-full max-h-[90vh] w-full max-w-screen overflow-hidden lg:w-3/4">
          <div
            className="flex h-full "
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {allSlides.map((slide, index) => (
              <div
                key={slide._key}
                className="flex h-full w-full flex-shrink-0 items-center justify-center lg:items-start lg:justify-start "
                inert={index !== currentSlide}
                aria-hidden={index !== currentSlide}
                tabIndex={index !== currentSlide ? -1 : undefined}
                style={{
                  visibility: index !== currentSlide ? "hidden" : "visible",
                  pointerEvents: index !== currentSlide ? "none" : "auto",
                }}
              >
                {renderSlide(slide, index === currentSlide)}
              </div>
            ))}
          </div>
        </div>

        <div className="fixed right-4 bottom-4 left-4 z-[410] flex flex-col items-center justify-between gap-6 text-center md:gap-2 lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="text-small md:text-small-md [&>p]:mb-0">
            {allSlides[currentSlide]?.caption ? (
              <PortableTextRenderer value={allSlides[currentSlide].caption} />
            ) : (
              allSlides[currentSlide]?.defaultCaption && (
                <p className="text-small md:text-small-md">
                  {allSlides[currentSlide].defaultCaption}
                </p>
              )
            )}
          </div>
          <div className="flex w-full justify-center gap-2 max-lg:justify-between lg:w-auto lg:justify-start">
            <button
              className="stroke-black p-1 hover:stroke-[5px]"
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <div className="max-lg:hidden">
                <ArrowLeft width={16} height={16} />
              </div>
              <div className="lg:hidden">
                <ArrowLeft width={24} height={24} />
              </div>
            </button>
            <button
              className="stroke-black p-1 hover:stroke-[5px]"
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <div className="max-lg:hidden">
                <ArrowRight width={16} height={16} />
              </div>
              <div className="lg:hidden">
                <ArrowRight width={24} height={24} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </dialog>,
    modalRoot,
  );
}
