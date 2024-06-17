import generateOptions from "@/components/contentful/common/richtext/richtext-options";
import RichContentBlock from "@/components/ui/rich-content-block/rich-content-block";
import {
  retrieveImageUrlFromMediaWrapper
} from "@/lib/contentful/helpers/common";
import {
  IRichContentBlock
} from "@/lib/contentful/interfaces/components";
import { IImage } from "@/lib/shared/interfaces/topics";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { cva, cx, VariantProps } from "class-variance-authority";
import React, { FC, HTMLAttributes } from "react";

const ctaContainer = cva([], {
  variants: {
    backgroundColor: {
      Default: "bg-foreground-600 text-background",
      Primary: "bg-background-100 text-primary-foregroundx",
      Secondary: "bg-secondary-900x bg-default-200 text-secondary-foregroundx",
      None: "text-primary-foregroundx",
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
const RichContentBlockWrapper: FC<IRichContentBlock> = (entry) => {
  const body = entry?.fields?.body || "";

  const images: IImage[] | null = entry?.fields?.images
    ? entry?.fields?.images?.map((img: any) =>
        retrieveImageUrlFromMediaWrapper(img)
      )
    : null;

  // const actions: ILink[] | null = entry?.fields?.actionButtons
  //   ? entry?.fields?.actionButtons?.map((btn: any) =>
  //       transformBaseButtonToLink(btn)
  //     )
  //   : null;

  const backgroundColor = entry?.fields?.backgroundColor || "Default";
  return (
    <div className="">
      <DivWrapper backgroundColor={backgroundColor}>
        <div className="spacing-component-padding ">
          <RichContentBlock
            entryId={entry?.sys?.id}
            body={
              body ? documentToReactComponents(body, generateOptions()) : ""
            }
            images={images}
            backgroundColor={backgroundColor}
          />
        </div>
      </DivWrapper>
    </div>
  );
};

export default RichContentBlockWrapper;
