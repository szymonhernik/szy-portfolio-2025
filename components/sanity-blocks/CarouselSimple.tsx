"use client";

import type { SingleProjectQueryResult } from "@/sanity.types";
import type { MuxVideoAssetOwn } from "@/types/mux";

import { useCarousel } from "@/contexts/CarouselContext";
import { decimalToRatio } from "@/lib/calculating";

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

import MuxPlayerWrapper from "../mux-player-wrapper";

type CarouselBlock = Extract<NonNullable<NonNullable<SingleProjectQueryResult>["blocks"]>[number], { _type: "carousel" }> & {
  defaultCaption?: string;
  slideTransition?: boolean;
};

export default function CarouselSimple({ items, slideTransition = false }: CarouselBlock) {
  const [slidingTransition, setSlidingTransition] = useState(slideTransition);
  const { openFullScreen, allSlides } = useCarousel();
  const [currentSlide, setCurrentSlide] = useState(0);
  if (!items) return null;

  // Remove console.log and update the filtering logic
  const slides = items.filter((slide) => !("hideInProjectPageCarousel" in slide && slide.hideInProjectPageCarousel === true) && !("content" in slide));

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
    // Get the current slide's key instead of the first slide's key
    const currentSlideKey = slides[localIndex]._key;

    // Find the index in allSlides based on the current slide's key
    const globalIndex = allSlides.findIndex((slide) => slide._key === currentSlideKey);

    return globalIndex;
  };

  const [cursor, setCursor] = useState<"left" | "right" | "default">("default");

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, currentTarget } = event;
    const { left, width } = currentTarget.getBoundingClientRect();
    const middle = left + width / 2;

    if (clientX < middle) {
      setCursor("left");
    } else {
      setCursor("right");
    }
  };

  const handleMouseLeave = () => setCursor("default");
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const middle = event.currentTarget.offsetWidth / 2;
    if (event.clientX > middle) {
      nextSlide();
    } else {
      prevSlide();
    }
  };
  return (
    <>
      <div
        className="relative mt-4 mr-auto w-full overflow-hidden"
        style={{
          cursor: slides.length === 1 ? "default" : cursor === "left" ? "w-resize" : cursor === "right" ? "e-resize" : "default",
        }}
        onMouseMove={slides.length === 1 ? undefined : handleMouseMove}
        onMouseLeave={slides.length === 1 ? undefined : handleMouseLeave}
        onClick={
          slides.length === 1
            ? undefined
            : () => {
                cursor === "left" ? prevSlide() : nextSlide();
              }
        }
        onKeyDown={(e) => {
          return;
        }}
      >
        <CarouselSlides slides={slides} currentSlide={currentSlide} slidingTransition={slidingTransition} />

        {/* <CarouselNavigation
        onPrev={prevSlide}
        onNext={nextSlide}
        slides={slides}
      /> */}
      </div>
      <div className="mt-[0.65rem] mb-4 flex justify-between">
        <button
          className="text-secondary text-small hover:font-outline-1-secondary md:text-small-md"
          type="button"
          onClick={() => openFullScreen(allSlides, getGlobalIndex(currentSlide))}
        >
          Click to view full-screen
        </button>
        {slides.length > 1 && <CarouselIndex currentSlide={currentSlide} totalSlides={slides.length} />}
      </div>
    </>
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

  // If there's only one slide, don't create clones
  if (slides.length === 1) {
    return (
      <div style={{ aspectRatio: getAspectRatio() }}>
        <Slide key={slides[0]._key} slide={slides[0]} carouselAspectRatio={getAspectRatio()} />
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
      className={clsx("flex", slidingTransition && "transition-transform duration-300 ease-out")}
      style={{
        transform: `translateX(${getTransformValue()})`,
        aspectRatio: getAspectRatio(),
      }}
    >
      {extendedSlides.map((slide, index) => {
        return <Slide key={`${slide._key}-${index}`} slide={slide} carouselAspectRatio={getAspectRatio()} />;
      })}
    </div>
  );
}

interface CarouselIndexProps {
  currentSlide: number;
  totalSlides: number;
}

export function CarouselIndex({ currentSlide, totalSlides }: CarouselIndexProps) {
  return (
    <div className="text-small md:text-small-md">
      {currentSlide + 1}
      {" / "}
      {totalSlides}
    </div>
  );
}

interface SlideProps {
  slide: NonNullable<CarouselBlock["items"]>[number];
  carouselAspectRatio: string;
}

type CarouselItems = NonNullable<CarouselBlock["items"]>;
type CarouselImage = Extract<CarouselItems[number], { _type: "imageSlide" }>["image"];

type CarouselVideo = Extract<CarouselItems[number], { _type: "videoSlide" }>["video"];

const getImageAspectRatio = (image: CarouselImage) => {
  return image?.asset?.metadata?.dimensions?.aspectRatio ? decimalToRatio(image.asset.metadata.dimensions.aspectRatio) : "16/9";
};

export const ImageSlide = ({
  image,
  carouselAspectRatio,
  fillContainer,
  heightClass,
  sizes,
}: {
  image: CarouselImage;
  carouselAspectRatio?: string;
  fillContainer?: boolean;
  heightClass?: string;
  sizes?: string;
}) => {
  if (!image?.asset || !image.asset.url) return null;

  const imageAspectRatio = getImageAspectRatio(image);

  return (
    <div
      className={clsx(
        "relative flex w-full shrink-0 items-start justify-start overflow-hidden",
        heightClass || "h-full", // Use provided heightClass or default to h-full
      )}
      style={{ aspectRatio: carouselAspectRatio }}
    >
      <div
        className={clsx("relative h-auto", fillContainer ? "w-full" : "max-w-full")}
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
          sizes={sizes || "(max-width: 1024px) 100vw, 50vw"}
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
    <div className="relative h-full w-full shrink-0 overflow-hidden" style={{ aspectRatio: carouselAspectRatio }}>
      <MuxPlayerWrapper controlsOff={true} allowAudio={allowAudio} video={video?.asset as unknown as MuxVideoAssetOwn} />
    </div>
  );
};

export function Slide({ slide, carouselAspectRatio }: SlideProps) {
  if (!slide) return null;

  if ("image" in slide) {
    if (!slide.image) return null;
    const fillContainer = slide.fillContainer ?? false;
    return <ImageSlide image={slide.image} carouselAspectRatio={carouselAspectRatio} fillContainer={fillContainer} />;
  }

  if ("video" in slide) {
    if (!slide.video) return null;
    return <VideoSlide video={slide.video} carouselAspectRatio={carouselAspectRatio} allowAudio={slide.allowAudio ?? false} />;
  }

  if ("content" in slide && slide.content) {
    return null;
  }

  return null;
}
