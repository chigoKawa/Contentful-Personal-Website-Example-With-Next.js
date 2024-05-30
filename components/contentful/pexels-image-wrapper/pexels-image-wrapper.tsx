import React from "react";

import { IPexelsImageWrapper } from "@/lib/contentful/interfaces/topics";

import Image from "next/image";

const PexelsMediaWrapper = (entry: IPexelsImageWrapper) => {


  const altText = entry?.fields?.pexelsImage?.alt;
  const src = entry?.fields?.pexelsImage?.src.original || "";
  const caption = entry.fields?.pexelsImage?.photographer_attribution;

  if (!altText) {
    return <>...</>;
  }

  return (
    <figure itemScope itemType="https://schema.org/ImageObject" itemProp="image" className="flex flex-col w-full m-auto ">
      <img itemProp="contentUrl" src={src} alt={altText} />
      {caption && <figcaption itemProp="caption" className="px-2 text-xs">{caption}</figcaption>}
    </figure>
  );
};

export default PexelsMediaWrapper;
