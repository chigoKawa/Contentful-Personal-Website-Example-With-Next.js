import dynamic from "next/dynamic";
import SampleComponent from "../sample-component/sample-component";
import HeroBannerWrapper from "@/components/contentful/hero-banner-wrapper/hero-banner-wrapper";
import CtaWrapper from "@/components/contentful/cta-wrapper/cta-wrapper";
import RichContentBlockWrapper from "../rich-content-block-wrapper/rich-content-block-wrapper";
import PexelsMediaWrapper from "../pexels-image-wrapper/pexels-image-wrapper";
import MediaWrapper from "../media-wrapper/media-wrapper";

export const componentMap: any = {
  module: dynamic(() =>
    import("@/components/contentful/sample-component/sample-component").then(
      (module) => module
    )
  ),

  heroBanner: HeroBannerWrapper,

  mediaWrapper: dynamic(() =>
    import("@/components/contentful/sample-component/sample-component").then(
      (module) => module
    )
  ),
  imageWrapper: MediaWrapper,

  splitScreen: dynamic(() =>
    import("@/components/contentful/sample-component/sample-component").then(
      (module) => module
    )
  ),
  grid: dynamic(() =>
    import("@/components/contentful/sample-component/sample-component").then(
      (module) => module
    )
  ),
  richContentBlock: RichContentBlockWrapper,
  cta: CtaWrapper,
  pexelsImageWrapper: PexelsMediaWrapper,
};
