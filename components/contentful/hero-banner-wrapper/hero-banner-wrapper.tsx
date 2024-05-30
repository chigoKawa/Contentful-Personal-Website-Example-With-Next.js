import React, { FC } from "react";
import { IHeroBanner } from "@/lib/contentful/interfaces/components";
import Banner from "@/components/ui/hero-banner/banner/banner";
import HeroBanner from "@/components/ui/hero-banner/hero-banner";
import BannerWithBg from "@/components/ui/hero-banner/banner-with-bg/banner-with-bg";
import { Card, Skeleton } from "@nextui-org/react";
import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import {
  retrieveImageUrlFromMediaWrapper,
  transformBaseButtonToLink,
} from "@/lib/contentful/helpers/common";
import { useContentfulInspectorMode } from "@contentful/live-preview/react";
import SplitWithContentImage from "@/components/ui/hero-banner/split-with-content-image/split-with-content-image";

const HeroBannerWrapper: FC<IHeroBanner> = (entry) => {
  const inspectorProps = useContentfulInspectorMode();
  const variant = entry?.fields?.variant;
  const headline = entry?.fields?.headline as string[];
  const body = entry?.fields?.body;
  const imageData = retrieveImageUrlFromMediaWrapper(entry?.fields?.image);

  const actions: ILink[] | null = entry?.fields?.actionButtons
    ? entry?.fields?.actionButtons?.map((btn: any) =>
        transformBaseButtonToLink(btn)
      )
    : null;

  // Ensure data is available before rendering
  if (!variant || !headline || !imageData.url) {
    return (
      <Skeleton className="rounded-lg">
        <div className="h-[600px] rounded-lg bg-default-300"></div>
      </Skeleton>
    );
  }
  return (
    <div className="">
      {variant === "Primary" && (
        <SplitWithContentImage
          img={imageData}
          headline={headline}
          body={body || ""}
          actions={actions}
          entryId={entry?.sys?.id}
        />
      )}
      {variant === "Centered" && (
        <Banner
          img={imageData}
          headline={headline}
          body={body || ""}
          actions={actions}
          entryId={entry?.sys?.id}
        />
      )}
      {variant === "With Background Image" && (
        <BannerWithBg
          entryId={entry?.sys?.id}
          img={imageData}
          headline={headline}
          body={body || ""}
          actions={actions}
        />
      )}
   
    </div>
  );
};

export default HeroBannerWrapper;
