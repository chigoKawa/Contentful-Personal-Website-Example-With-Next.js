import React, { FC, HTMLAttributes } from "react";
import { IHeroBanner, ICta } from "@/lib/contentful/interfaces/components";
import Banner from "@/components/ui/hero-banner/banner/banner";
import HeroBanner from "@/components/ui/hero-banner/hero-banner";
import Cta from "@/components/ui/cta/cta";
import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import { cva, cx, VariantProps } from "class-variance-authority";
import {
  retrieveImageUrlFromMediaWrapper,
  transformBaseButtonToLink,
} from "@/lib/contentful/helpers/common";

const ctaContainer = cva([], {
  variants: {
    backgroundColor: {
      Default: "bg-foreground-600 text-background",
      Primary: "bg-background-100 text-primary-foregroundx",
      Secondary: "bg-secondary-900 text-secondary-foreground",
      None: "text-primary-foreground",
    },
  },
  defaultVariants: {
    backgroundColor: "Primary",
  },
});
// export type CtaWrapperProps = VariantProps<typeof ctaContainer>;
interface CtaWrapperProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ctaContainer> {
  children: React.ReactNode;
}

const DivWrapper: FC<CtaWrapperProps> = ({
  backgroundColor = "Primary",
  children,
}) => {
  return (
    <div className={cx(ctaContainer({ backgroundColor }))}>{children}</div>
  );
};
const CtaWrapper: FC<ICta> = (entry) => {
  const body = entry?.fields?.body || "";
  const title = entry?.fields?.title || "";
  const images: IImage[] | null = entry?.fields?.images
    ? entry?.fields?.images?.map((img: any) =>
        retrieveImageUrlFromMediaWrapper(img)
      )
    : null;

  const actions: ILink[] | null = entry?.fields?.actionButtons
    ? entry?.fields?.actionButtons?.map((btn: any) =>
        transformBaseButtonToLink(btn)
      )
    : null;

  // const imageData = retrieveImageUrlFromMediaWrapper(entry?.fields?.image)
  const backgroundColor = entry?.fields?.backgroundColor || "Default";
  return (
    <div className="">
      {/* <pre className="">{JSON.stringify(images, null, 2)}</pre> */}
      <DivWrapper backgroundColor={backgroundColor}>
        <div className="spacing-component-padding ">
          <Cta
            entryId={entry?.sys?.id}
            title={title}
            body={body}
            images={images}
            actions={actions}
            backgroundColor={backgroundColor}
          />
        </div>
      </DivWrapper>
    </div>
  );
};

export default CtaWrapper;
