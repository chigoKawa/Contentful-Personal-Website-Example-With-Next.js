import dynamic from "next/dynamic";
import SampleComponent from "../sample-component/sample-component";
import HeroBannerWrapper from "@/components/contentful/hero-banner-wrapper/hero-banner-wrapper";
import CtaWrapper from "@/components/contentful/cta-wrapper/cta-wrapper";

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
  imageWrapper: dynamic(() =>
    import("@/components/contentful/sample-component/sample-component").then(
      (module) => module
    )
  ),

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
  richContent: dynamic(() =>
    import("@/components/contentful/sample-component/sample-component").then(
      (module) => module
    )
  ),
  cta: CtaWrapper,

};
