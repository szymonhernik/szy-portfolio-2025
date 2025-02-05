"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import { useCarousel } from "@/contexts/CarouselContext";
import { decimalToRatio } from "@/lib/calculating";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import MuxPlayerWrapper from "../mux-player-wrapper";

type CarouselBlock = Extract<
  NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number],
  { _type: "carousel" }
> & {
  defaultCaption?: string;
  slideTransition?: boolean;
};

export default function CarouselSimple({
  items,
  slideTransition = false,
}: CarouselBlock) {
  const [slidingTransition, setSlidingTransition] = useState(slideTransition);
  const { openFullScreen, allSlides } = useCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);
  if (!items) return null;

  const slides = items.filter((slide) => !("content" in slide));

  const nextSlide = () => {
    if (!slideTransition) {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      return;
    }

    setSlidingTransition(true);
    setCurrentSlide((prev) => prev + 1);

    if (currentSlide === slides.length - 1) {
      setTimeout(() => {
        setSlidingTransition(false);
        setCurrentSlide(0);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (!slideTransition) {
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      return;
    }

    setSlidingTransition(true);
    setCurrentSlide((prev) => prev - 1);

    if (currentSlide === 0) {
      setTimeout(() => {
        setSlidingTransition(false);
        setCurrentSlide(slides.length - 1);
      }, 300);
    }
  };

  const getGlobalIndex = (localIndex: number) => {
    if (!items?.[0]?._key || !allSlides) return localIndex;
    const firstSlideKey = items[0]._key;
    const globalStartIndex = allSlides.findIndex(
      (slide) => slide._key === firstSlideKey,
    );
    return globalStartIndex + localIndex;
  };

  return (
    <div className="relative my-4 mr-auto w-full max-w-3xl overflow-hidden">
      <CarouselSlides
        slides={slides}
        currentSlide={currentSlide}
        slidingTransition={slidingTransition}
      />
      <CarouselNavigation
        onPrev={prevSlide}
        onNext={nextSlide}
        slides={slides}
      />
      <div className="mt-[0.65rem] flex justify-between">
        <button
          className="text-secondary text-small hover:font-outline-1-secondary md:text-small-md"
          type="button"
          onClick={() =>
            openFullScreen(allSlides, getGlobalIndex(currentSlide))
          }
        >
          Click to view full-screen
        </button>
        <CarouselIndex
          currentSlide={currentSlide}
          totalSlides={slides.length}
        />
      </div>
    </div>
  );
}
interface CarouselSlidesProps {
  slides: NonNullable<CarouselBlock["items"]>;
  currentSlide: number;
  slidingTransition: boolean;
}
export function CarouselSlides({
  slides,
  currentSlide,
  slidingTransition,
}: CarouselSlidesProps) {
  const getAspectRatio = () => {
    if (!slides?.[0]) return "3 / 2"; // default fallback
    const firstSlide = slides[0];

    if (
      "image" in firstSlide &&
      firstSlide.image?.asset?.metadata?.dimensions
    ) {
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

  // If there's only one slide, don't create clones
  if (slides.length === 1) {
    return (
      <div style={{ aspectRatio: getAspectRatio() }}>
        <Slide
          key={slides[0]._key}
          slide={slides[0]}
          carouselAspectRatio={getAspectRatio()}
        />
      </div>
    );
  }

  // Create an array with cloned slides for infinite effect
  const extendedSlides = [
    slides[slides.length - 1], // Clone last slide at start
    ...slides,
    slides[0], // Clone first slide at end
  ];

  const getTransformValue = () => {
    // Adjust for the extra slide at the beginning
    const adjustedPosition = currentSlide + 1;
    return `-${adjustedPosition * 100}%`;
  };

  return (
    <div
      className={clsx(
        "flex",
        slidingTransition && "transition-transform duration-300 ease-out",
      )}
      style={{
        transform: `translateX(${getTransformValue()})`,
        aspectRatio: getAspectRatio(),
      }}
    >
      {extendedSlides.map((slide, index) => {
        return (
          <Slide
            key={`${slide._key}-${index}`}
            slide={slide}
            carouselAspectRatio={getAspectRatio()}
          />
        );
      })}
    </div>
  );
}

interface CarouselNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  slides: NonNullable<CarouselBlock["items"]>;
}

export function CarouselNavigation({
  onPrev,
  onNext,
  slides,
}: CarouselNavigationProps) {
  return (
    <>
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="-translate-y-1/2 absolute top-1/2 left-4 rounded-full bg-white/50 p-2"
          >
            Prev
          </button>
          <button
            type="button"
            onClick={onNext}
            className="-translate-y-1/2 absolute top-1/2 right-4 rounded-full bg-white/50 p-2"
          >
            Next
          </button>
        </>
      )}
    </>
  );
}

interface CarouselIndexProps {
  currentSlide: number;
  totalSlides: number;
}

export function CarouselIndex({
  currentSlide,
  totalSlides,
}: CarouselIndexProps) {
  return (
    <div className="text-small md:text-small-md">
      {currentSlide + 1}–{totalSlides}
    </div>
  );
}

interface SlideProps {
  slide: NonNullable<CarouselBlock["items"]>[number];
  carouselAspectRatio: string;
}

type CarouselItems = NonNullable<CarouselBlock["items"]>;
type CarouselImage = Extract<
  CarouselItems[number],
  { _type: "imageSlide" }
>["image"];

type CarouselVideo = Extract<
  CarouselItems[number],
  { _type: "videoSlide" }
>["video"];

const getImageAspectRatio = (image: CarouselImage) => {
  return image?.asset?.metadata?.dimensions?.aspectRatio
    ? decimalToRatio(image.asset.metadata.dimensions.aspectRatio)
    : "16/9";
};

export const ImageSlide = ({
  image,
  carouselAspectRatio,
}: {
  image: CarouselImage;
  carouselAspectRatio?: string;
}) => {
  if (!image?.asset || !image.asset.url) return null;

  const imageAspectRatio = getImageAspectRatio(image);

  return (
    <div
      className="relative flex h-full w-full items-start justify-start"
      style={{ aspectRatio: carouselAspectRatio }}
    >
      <div
        className="relative h-auto"
        style={{
          aspectRatio: imageAspectRatio,
          maxHeight: "100%",
          maxWidth: "100%",
        }}
      >
        <Image
          src={image.asset.url}
          alt={image.alt || ""}
          className="object-contain"
          width={image.asset.metadata?.dimensions?.width || 400}
          height={image.asset.metadata?.dimensions?.height || 300}
          placeholder="blur"
          blurDataURL={image.asset.metadata?.lqip || ""}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

const VideoSlide = ({
  video,
  carouselAspectRatio,
  allowAudio,
}: {
  video: CarouselVideo;
  carouselAspectRatio?: string;
  allowAudio: boolean;
}) => {
  if (!video?.asset) return null;
  return (
    <div className="relative h-full w-full shrink-0">
      <MuxPlayerWrapper
        allowAudio={allowAudio}
        video={video?.asset as unknown as MuxVideoAssetOwn}
      />
    </div>
  );
};

export function Slide({ slide, carouselAspectRatio }: SlideProps) {
  if (!slide) return null;

  if ("image" in slide) {
    if (!slide.image) return null;
    return (
      <ImageSlide
        image={slide.image}
        carouselAspectRatio={carouselAspectRatio}
      />
    );
  }

  if ("video" in slide) {
    if (!slide.video) return null;
    return (
      <VideoSlide
        video={slide.video}
        carouselAspectRatio={carouselAspectRatio}
        allowAudio={slide.allowAudio ?? false}
      />
    );
  }

  if ("content" in slide && slide.content) {
    return null;
  }

  return null;
}
