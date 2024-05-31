import { IPexelsImageWrapper } from "@/lib/contentful/interfaces/topics";

import { retrieveImageUrlFromMediaWrapper } from "@/lib/contentful/helpers/common";
import { Image } from "@nextui-org/react";

const PexelsMediaWrapper = (entry: IPexelsImageWrapper) => {
  const img = retrieveImageUrlFromMediaWrapper(entry);
  const altText = entry?.fields?.pexelsImage?.alt;
  const src = entry?.fields?.pexelsImage?.src.original || "";
  const caption = entry.fields?.pexelsImage?.photographer_attribution;

  if (!img?.alt) {
    return <>...</>;
  }

  return (
    <figure
      itemScope
      itemType="https://schema.org/ImageObject"
      itemProp="image"
      className="flex flex-col w-full m-auto "
    >
      {/* <img itemProp="contentUrl" src={src} alt={altText} /> */}
      <div className="mb-1">
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

export default PexelsMediaWrapper;
