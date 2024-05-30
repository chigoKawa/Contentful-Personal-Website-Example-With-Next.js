import React from "react";

import Image from "next/image";
import { IPexelsImageWrapper, IImageWrapper } from "@/lib/contentful/interfaces/topics";

import { retrieveImageUrlFromMediaWrapper } from "@/lib/contentful/helpers/common";

const MediaWrapper = (entry: IImageWrapper ) => {
  // const { altText, media } = entry?.fields;

 
  const media = retrieveImageUrlFromMediaWrapper(entry)
  const altText = entry?.fields?.altText;
  const caption = ""

  if (!altText) {
    return <>...</>;
  }
  return (
    <figure itemScope itemType="https://schema.org/ImageObject" itemProp="image" className="flex flex-col  w-full m-auto ">
      <img itemProp="contentUrl" src={media.url} alt={altText} />
      {caption && <figcaption itemProp="caption" className="px-2 text-xs">{caption}</figcaption>}
    </figure>
  );




};

export default MediaWrapper;
