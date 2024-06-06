"use client";
import React from "react";
import { dateFormatter } from "@/lib/contentful/helpers/common";

import { Chip } from "@nextui-org/chip";
// import {
//   CardBody,
//   CardContainer,
//   CardItem,
// } from "@/components/3d-card/3d-card";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
interface IBlogCardProps {
  image: { url: string; alt: string };
  title: string;
  summary: any;
  publishedDate: any;
  tag?: any;
}

export const BlogCardSkeleton = () => {
  return (
    <div className="h-96 w-96 p-2 bg-black animate-pulse  sm:w-[30rem] rounded-xl relative ">
      <div className="h-full  bg-gray-700 rounded-md  w-full my-4 relative p-2">
        <div className="absolute translate top-2 right-2 h-10x bg-gray-800 text-white text-xs rounded-md px-4 py-2 shadow shadow-accent ">
          <div className="h-2 bg-gray-700 rounded-full  w-20 "></div>
        </div>

        <div className="relative    pt-32 sm:pt-48 lg:pt-64">
          <div className="h-2.5 bg-gray-500 rounded-full  w-48 mb-4"></div>
          <div className="h-2  rounded-full bg-gray-500  w-full mb-2.5"></div>
        </div>
      </div>
    </div>
  );
};

const BlogCard: React.FC<IBlogCardProps> = ({
  title,
  summary,
  image,
  publishedDate,
  tag,
}) => {
  return (
    <>
    
    {/* <Card className="py-4x max-w-fit w-80"> */}
      {/* <CardBody className="overflow-visible py-2"> */}
        <article className="w-80 relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <Image
            fallbackSrc={`${image.url}?w=200`}
            // loading="eager"
            radius="none"
            alt={image.alt}
            className="object-cover "
            src={image.url}
            // width={270}
          />
          {/* <img
              alt={image.alt}
              src={image.url}
              className="absolutex inset-0 h-full w-full object-cover opacity-70x "
            /> */}
          {tag && (
            <div className="absolute z-50 translate top-2 right-2 ">
              <Chip color="primary">{tag}</Chip>
            </div>
          )}

          <div className="relative bg-gradient-to-t from-foreground-900/50 to-foreground-900/25 ">
            <div className="p-4 sm:p-6">
              {publishedDate && (
                <time
                  dateTime={publishedDate}
                  className="block text-xs text-foreground/90"
                >
                  {dateFormatter(publishedDate)}
                </time>
              )}

              <div className="flex flex-col ">
                <div className="">
                  <a href="#">
                    <h3 className="mt-0.5 text-lg ">{title}</h3>
                  </a>
                </div>
                <p className="mt-2 line-clamp-3x text-sm/relaxed text-foreground/95">
                  {summary}
                </p>
              </div>
            </div>
          </div>
        </article>
      {/* </CardBody> */}
    {/* </Card> */}
    </>
  );

};

export default BlogCard;
