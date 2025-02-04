"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";

import { useCarousel } from "@/contexts/CarouselContext";

import clsx from "clsx";
import { useState } from "react";

type CarouselBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "carousel" }> & {
  defaultCaption?: string;
};

export default function CarouselSimple({ items }: CarouselBlock) {
  const slidingTransition = false;
  const { openFullScreen, allSlides } = useCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);
  if (!items) return null;

  const slides = items;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative mr-auto w-full max-w-3xl overflow-hidden">
      <CarouselSlides slides={slides} currentSlide={currentSlide} slidingTransition={slidingTransition} />
      <CarouselNavigation onPrev={prevSlide} onNext={nextSlide} />
      <CarouselIndex currentSlide={currentSlide} totalSlides={slides.length} />
    </div>
  );
}
interface CarouselSlidesProps {
  slides: NonNullable<CarouselBlock["items"]>;
  currentSlide: number;
  slidingTransition: boolean;
}
export function CarouselSlides({ slides, currentSlide, slidingTransition }: CarouselSlidesProps) {
  const getAspectRatio = () => {
    if (!slides?.[0]) return "3 / 2"; // default fallback
    const firstSlide = slides[0];

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

  return (
    <div
      className={clsx("flex ", slidingTransition && "transition-transform duration-300 ease-out")}
      style={{
        transform: `translateX(-${currentSlide * 100}%)`,
        aspectRatio: getAspectRatio(),
      }}
    >
      {slides.map((slide) => (
        <div key={slide._key} className={"h-full w-full flex-shrink-0 odd:bg-red-500 even:bg-blue-500"} />
      ))}
    </div>
  );
}

interface CarouselNavigationProps {
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselNavigation({ onPrev, onNext }: CarouselNavigationProps) {
  return (
    <>
      <button type="button" onClick={onPrev} className="-translate-y-1/2 absolute top-1/2 left-4 rounded-full bg-white/50 p-2">
        Prev
      </button>
      <button type="button" onClick={onNext} className="-translate-y-1/2 absolute top-1/2 right-4 rounded-full bg-white/50 p-2">
        Next
      </button>
    </>
  );
}

interface CarouselIndexProps {
  currentSlide: number;
  totalSlides: number;
}

export function CarouselIndex({ currentSlide, totalSlides }: CarouselIndexProps) {
  return (
    <div className="">
      {currentSlide + 1}–{totalSlides}
    </div>
  );
}
