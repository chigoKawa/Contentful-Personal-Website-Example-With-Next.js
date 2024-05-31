import { IImageWrapper } from "@/lib/contentful/interfaces/topics";

import { retrieveImageUrlFromMediaWrapper } from "@/lib/contentful/helpers/common";
import { Image } from "@nextui-org/react";

const MediaWrapper = (entry: IImageWrapper) => {
  // const { altText, media } = entry?.fields;

  // const img = retrieveImageUrlFromMediaWrapper(entry)

  const img = retrieveImageUrlFromMediaWrapper(entry);
  const altText = entry?.fields?.altText;
  const caption = "";

  if (!altText) {
    return <>...</>;
  }
  return (
    <figure
      itemScope
      itemType="https://schema.org/ImageObject"
      itemProp="image"
      className="flex flex-col  w-full m-auto "
    >
      {/* <img itemProp="contentUrl" src={img.url} alt={img.alt} /> */}
      <div className="">
        <Image
          isBlurred={img?.enableBlur}
          isZoomed={img?.enableZoom}
          radius={img?.radius || "none"}
          alt={img?.alt || ""}
          src={img?.url}
          fallbackSrc={img?.url}
          classNames={{
            img: "w-full h-full object-cover ",
            wrapper: "h-full w-full",
            zoomedWrapper: "h-full w-full",
          }}
        />
      </div>
      {caption && (
        <figcaption itemProp="caption" className="px-2 text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default MediaWrapper;
