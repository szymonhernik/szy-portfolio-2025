"use client";

import type { CarouselBlock } from "@/types/blocks"; // You'll need to create this type
import type { ReactNode } from "react";

import { createContext, useContext, useState } from "react";

type CarouselSlide = NonNullable<CarouselBlock["items"]>[number] & {
  defaultCaption?: string;
};

type CarouselContextType = {
  allSlides: CarouselSlide[];
  currentSlideIndex: number;
  isFullScreen: boolean;
  openFullScreen: (slides: CarouselBlock["items"], initialIndex: number) => void;
  closeFullScreen: () => void;
  nextSlide: () => void;
  previousSlide: () => void;
};

const CarouselContext = createContext<CarouselContextType | null>(null);

export function CarouselProvider({
  children,
  initialSlides,
}: {
  children: ReactNode;
  initialSlides: CarouselBlock["items"];
}) {
  const [slides] = useState<CarouselBlock["items"]>(initialSlides);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const openFullScreen = (_: CarouselBlock["items"], initialIndex: number) => {
    setCurrentSlideIndex(initialIndex);
    setIsFullScreen(true);
  };

  const closeFullScreen = () => {
    setIsFullScreen(false);
  };

  const nextSlide = () => {
    if (!slides?.length) return;
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    if (!slides?.length) return;
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <CarouselContext.Provider
      value={{
        allSlides: slides as CarouselSlide[],
        currentSlideIndex,
        isFullScreen,
        openFullScreen,
        closeFullScreen,
        nextSlide,
        previousSlide,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export const useCarousel = () => {
  const context = useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within CarouselProvider");
  return context;
};
