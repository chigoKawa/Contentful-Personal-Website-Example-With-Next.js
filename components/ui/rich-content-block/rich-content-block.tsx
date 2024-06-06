import React, { FC } from "react";
import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Link,
} from "@nextui-org/react";
import {
  ICta,
  IRichContentBlock,
} from "@/lib/contentful/interfaces/components";
import { cva, cx, VariantProps } from "class-variance-authority";
import generateOptions from "@/components/contentful/common/richtext/richtext-options";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const metaSection = cva(
  ["p-8 md:p-12 lg:px-16 lg:py-24 flex items-center shadow-md w-full"],
  {
    variants: {
      backgroundColor: {
        Default: "bg-foreground-900x bg-foreground-500 text-background",
        Primary: "bg-primary-500 text-primary-foreground",
        Secondary: "bg-background-100 text-foreground",
        None: "bg-foreground-700 text-background",
      },
    },
    defaultVariants: {
      backgroundColor: "Primary",
    },
  }
);

const bodyField = cva(["text-sm md:text-base sm:mt-4 sm:block prose-smx"], {
  variants: {
    backgroundColor: {
      Default: "text-background/90",
      Primary: "text-primary-foreground/90",
      Secondary: "text-foreground/90",
      None: "text-primary-foreground/90",
    },
  },
  defaultVariants: {
    backgroundColor: "Primary",
  },
});

const imagesContainer = cva(["grid md:grid-cols-1 h-full order-first md:order-last gap-8 col-auto "], {
  variants: {
    imageCount: {
      0: "",
      1: "grid-cols-1",
      2: "grid-cols-2 lg:grid-cols-2",
      3: "grid-cols-2 lg:grid-cols-2",
      4: "grid-cols-2 lg:grid-cols-2",
    },
  },
  defaultVariants: {
    imageCount: 1,
  },
});

const sectionContainer = cva(["grid w-full gap-4"], {
  variants: {
    imageCount: {
      0: "grid-cols-1",
      1: "grid-cols-1 md:grid-cols-2",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2",
      4: "grid-cols-1 md:grid-cols-2",
    },
  },
  defaultVariants: {
    imageCount: 1,
  },
});

interface IProps {
  images?: IImage[] | null;
  body: any;
  entryId: string;
  backgroundColor: ICta["fields"]["backgroundColor"];
}

const RichContentBlock: FC<IProps> = ({
  images,
  body,

  entryId,
  backgroundColor,
}) => {
  type ImageCount = 0 | 1 | 2 | 3 | 4;

  const imageCount: ImageCount = Array.isArray(images)
    ? (images.length as ImageCount)
    : 0;
  return (
    <section>
      <div className="py-8 sm:px-6x lg:px-8x spacing-component-max-width">
        <div className={cx(sectionContainer({ imageCount: imageCount || 0 }))}>
          <div className={cx(metaSection({ backgroundColor }))}>
            <div className="mx-auto max-w-xl">
              {/* <h2
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"title"}
                className="text-2xl font-bold text-primary-foregroundx md:text-3xl"
              ></h2> */}

              <div
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"body"}
                className={cx(bodyField({ backgroundColor }))}
              >
                {body}
              </div>
            </div>
          </div>

          {Array.isArray(images) && images?.length > 0 && (
            <div
              data-contentful-entry-id={entryId}
              data-contentful-field-id={"images"}
              className={cx(imagesContainer({ imageCount: imageCount || 0 }))}
            >
              {Array.isArray(images) &&
                images?.map((img: IImage, itx: number) => {
                  return (
                    <div key={`${img.url}-${itx}`} className="">
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
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RichContentBlock;
