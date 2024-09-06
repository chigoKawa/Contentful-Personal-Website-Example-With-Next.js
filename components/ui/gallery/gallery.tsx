"use client";
import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IImage } from "@/lib/shared/interfaces/topics";
import FlatCarousel from "./flat-carousel/flat-carousel";
import { IImageItem } from "./flat-carousel/carousel-item";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

interface IImageList {
  images: IImage[];
}

const images: IImageItem[] = [
  {
    image: {
      alt: "Sunset over mountains",
      url: "https://picsum.photos/id/1/600/600",
    },
    title: "Majestic Sunset",
    body: "A beautiful sunset casting golden hues over the mountains.",
  },
  {
    image: {
      alt: "Calm lake with forest",
      url: "https://picsum.photos/id/2/600/600",
    },
    title: "Serenity",
    body: "A tranquil lake surrounded by lush greenery, reflecting the calm skies.",
  },
  {
    image: {
      alt: "City skyline at night",
      url: "https://picsum.photos/id/3/600/600",
    },
    title: "City Lights",
    body: "The vibrant lights of the city shining bright under the night sky.",
  },
  {
    image: {
      alt: "Snow-covered trees",
      url: "https://picsum.photos/id/4/600/600",
    },
    title: "Winter Wonderland",
    body: "Snow blankets the trees, creating a serene and peaceful winter scene.",
  },
  {
    image: {
      alt: "Desert landscape",
      url: "https://picsum.photos/id/5/600/600",
    },
    title: "Desert Dunes",
    body: "The rolling sand dunes stretch out as far as the eye can see.",
  },
  {
    image: {
      alt: "Ocean waves crashing",
      url: "https://picsum.photos/id/6/600/600",
    },
    title: "Ocean Breeze",
    body: "Waves crash onto the shore, bringing with them the fresh, salty air.",
  },
  {
    image: {
      alt: "Forest trail in autumn",
      url: "https://picsum.photos/id/7/600/600",
    },
    title: "Autumn Path",
    body: "A scenic trail through the forest, with leaves in vibrant autumn colors.",
  },
  {
    image: { alt: "Mountain peak", url: "https://picsum.photos/id/8/600/600" },
    title: "The Summit",
    body: "A towering mountain peak covered in snow, standing tall against the sky.",
  },
  {
    image: { alt: "Flower field", url: "https://picsum.photos/id/9/600/600" },
    title: "Spring Blossoms",
    body: "A field of colorful flowers in full bloom, welcoming the spring season.",
  },
  {
    image: {
      alt: "Aerial view of forest",
      url: "https://picsum.photos/id/10/600/600",
    },
    title: "Bird's Eye View",
    body: "An aerial view of a dense forest, with shades of green as far as the eye can see.",
  },
];

const Gallery = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollToIndex = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );
  return <FlatCarousel images={images} />;
  return (
    <div>
      <section className="bg-yellow-600 p-10 overflow-hidden w-screen">
        <div className="embla  p-20x p-2" ref={emblaRef}>
          <div className="embla__container">
            {images?.map((img, imgx) => {
              return (
                <div
                  key={`key-${imgx}`}
                  className="embla__slide  w-full h-full "
                >
                  <div className=" p-2 w-full flex items-center">
                    <img
                      className="h-auto max-w-full m-auto rounded-lg"
                      src={img?.image?.url}
                      alt={img?.image?.alt || ""}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full max-w-full bg-gradient-to-r from-background to-primary p-2  flex overflow-y-auto gap-2">
          {images?.map((img, imgx) => {
            return (
              <div
                onClick={() => scrollToIndex(imgx)}
                key={`key-${imgx}`}
                className="cursor-pointer"
              >
                <div className="md:p-2 p-1 w-32 h-32">
                  <img
                    className="h-auto max-w-full rounded-lg object-cover object-center"
                    src={img?.image?.url}
                    alt={img?.image?.alt || ""}
                  />
                </div>
              </div>
            );
          })}
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
      </section>
    </div>
  );
};

export default Gallery;
