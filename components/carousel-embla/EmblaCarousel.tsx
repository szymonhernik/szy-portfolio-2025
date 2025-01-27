"use client";

import type { EmblaOptionsType } from "embla-carousel";
import type React from "react";

import { useCarousel } from "@/contexts/CarouselContext";

import useEmblaCarousel from "embla-carousel-react";

import { NextButton, PrevButton, usePrevNextButtons } from "./EmblaCarouselArrowButtons";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

type CarouselSlide = {
  type: "image" | "video" | "content";
  key: string;
  element: JSX.Element;
};

type PropType = {
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  carouselId: string;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, carouselId } = props;
  const { openFullScreen } = useCarousel();
  const defaultOptions: EmblaOptionsType = {
    loop: true,
    ...options,
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const handleFullScreenClick = () => {
    const currentIndex = emblaApi?.selectedScrollSnap() || 0;
    // @ts-ignore
    openFullScreen(carouselId, currentIndex);
  };

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.key}>
              {slide.element}
            </div>
          ))}
        </div>
      </div>
      {/* <button onClick={handleFullScreenClick} className="absolute top-4 right-4 z-10 rounded bg-black/50 p-2 text-white">
        View Full-screen
      </button> */}

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {/* @ts-ignore */}
          {scrollSnaps.map((snapPosition) => (
            <DotButton
              key={`dot-${snapPosition}`}
              onClick={() => onDotButtonClick(scrollSnaps.indexOf(snapPosition))}
              className={"embla__dot".concat(scrollSnaps.indexOf(snapPosition) === selectedIndex ? " embla__dot--selected" : "")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
