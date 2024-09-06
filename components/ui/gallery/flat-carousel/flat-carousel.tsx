"use client";
import useEmblaCarousel from "embla-carousel-react";
import { FC, useCallback, useEffect, useState } from "react";
// import { EmblaOptionsType } from "embla-carousel";
import { EmblaCarouselType } from "embla-carousel";
import { sendGTMEvent } from "@next/third-parties/google";

import { IImage } from "@/lib/shared/interfaces/topics";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import CarouselItem from "./carousel-item";

interface IImageList {
  images: IImage[];
}
interface IProps {
  images: { image: IImage; title: string; body: string }[];
}

const FlatCarousel: FC<IProps> = ({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel();
  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      onSelect(emblaApi);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      onSelect(emblaApi);
    }
  }, [emblaApi]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (emblaApi) {
        emblaApi?.scrollTo(index);
        onSelect(emblaApi);
      }
    },
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    // onInit(emblaApi)
    onSelect(emblaApi);
    // emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full  ">
      {/* <button
        onClick={() => sendGTMEvent("event", "buttonClicked", { value: "xyz" })}
      >
        Send Event
      </button> */}
      <>
        <div id="" className="relative h-[600px]x">
          <div
            className="bg-primaryx absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0 "
            data-twe-carousel-indicators=""
          >
            {images?.map((img, imgx) => {
              return (
                <button
                  key={`key-${imgx}`}
                  onClick={() => scrollToIndex(imgx)}
                  type="button"
                  className={`${
                    selectedIndex == imgx ? "bg-primary" : "bg-white"
                  } mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent  bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none`}
                  // aria-current="true"
                  aria-label={`Slide ${imgx + 1}`}
                />
              );
            })}
          </div>

          <div ref={emblaRef} className="embla ">
            <div className="embla__container  ">
              {images?.map((img, imgx) => {
                return (
                  <div
                    key={`key-${imgx}`}
                    className="embla__slide relative w-full  "
                  >
                    <CarouselItem item={img} />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            onClick={scrollPrev}
          >
            <span className="inline-block h-8x w-8x">
              <IoCaretBack size={"30"} />
            </span>
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Previous
            </span>
          </button>
          <button
            className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
            type="button"
            onClick={scrollNext}
          >
            <span className="inline-block h-8x w-8x">
              <IoCaretForward size={"30"} />
            </span>

            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Next
            </span>
          </button>
        </div>
      </>
    </div>
  );
};

export default FlatCarousel;
