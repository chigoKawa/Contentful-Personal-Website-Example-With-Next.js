import Cta from "@/components/ui/cta/cta";
import {
  retrieveImageUrlFromMediaWrapper,
  transformBaseButtonToLink,
} from "@/lib/contentful/helpers/common";
import { ICta } from "@/lib/contentful/interfaces/components";
import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import { cva, cx, VariantProps } from "class-variance-authority";
import React, { FC, HTMLAttributes } from "react";


const ctaContainer = cva(["prose-md"], {
  variants: {
    backgroundColor: {
      Default: "bg-content1",
      Primary: "bg-content3",
      Secondary: "bg-content4",
      None: "",
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
