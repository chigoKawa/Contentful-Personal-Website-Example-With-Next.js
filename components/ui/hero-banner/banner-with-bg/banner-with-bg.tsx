import React, { useState, FC } from "react";
import useDimensions from "react-cool-dimensions";
import CustomButton from "@/components/primitives/custom-button/custom-button";

import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import NextImage from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Link,
} from "@nextui-org/react";

interface IBannerWithBg {
  img: IImage;
  headline: string[];
  body: string;
  actions?: ILink[] | null;
  entryId: string;
}

export function arrayCeil(arr: any, number: number) {
  const sorted = arr.sort((a: any, b: any) => a - b);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > number) {
      return sorted[i];
    }
  }

  // If no index found return the last element
  return sorted[sorted.length - 1];
}

const BannerWithBg: FC<IBannerWithBg> = ({
  img,
  headline,
  body,
  actions,
  entryId,
}) => {
  return (
    <div className="">
      <Card
        isBlurred
        radius="none"
        className="col-span-12 sm:col-span-4 h-[600px]"
      >
        <CardHeader className="absolute z-10 bottom-20 flex-col !items-start">
          <div className="relative max-w-screen-xl  w-full m-auto px-4  ">
            <div className=" w-full text-white ">
              <h1
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"headline"}
                className="text-3xl font-extrabold sm:text-5xl"
              >
                {headline[0]}
                <strong className="block font-extrabold text-primary-500">

                  {headline[1]}
                </strong>
              </h1>

              <p
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"body"}
                className="mt-4 max-w-lg sm:text-xl/relaxed"
              >
                {body}
              </p>

              <div
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"actionButtons"}
                className="mt-8 flex  flex-wrap gap-4 text-center"
              >
                {Array.isArray(actions) &&
                  actions?.map((btn: ILink, itx: number) => {
                    return (
                      <div key={`${btn.url}-${itx}`} className="w-fullx ">
                        <Button
                          as={Link}
                          href={btn.url}
                          target={btn.openInNewTab ? "_blank" : "_self"}
                          color={btn.color}
                          variant={btn?.variant}
                          size={btn?.size}
                        >
                          {btn?.label}
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

     
        </CardHeader>

        <Image
          isZoomed={img?.enableZoom}
          isBlurred={img.enableBlur}
          radius={img.radius}
          removeWrapper
          alt={img.alt}
          className="z-0 w-full h-full object-cover !bg-opacity-5 backdrop-filter"
          src={img.url}
          fallbackSrc={`${img.url}?w=100`}
          loading="lazy"
        />
      </Card>
    </div>
  );

  return (
    <section
      style={{ backgroundImage: `url(${img.url})` }}
      className={`relative  bg-cover bg-center bg-no-repeat`}
    >
      <div className="absolute inset-0 bg-foreground/75  sm:bg-transparent sm:from-background/95 sm:to-background/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8 text-white">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            {headline[0]}
            <strong className="block font-extrabold text-primary-700">
              {" "}
              {headline[1]}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <a
              href="#"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Get Started
            </a>

            <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerWithBg;
