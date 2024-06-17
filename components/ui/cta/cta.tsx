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
import { ICta } from "@/lib/contentful/interfaces/components";
import { cva, cx, VariantProps } from "class-variance-authority";

const metaSection = cva(
  ["p-8 md:p-12 lg:px-16 lg:py-24 flex items-center shadow-md"],
  {
    variants: {
      backgroundColor: {
        Default: "bg-foreground-500 text-background",
        Primary: "bg-primary-600",
        Secondary: "bg-primary text-foreground",
        None: "bg-default text-backgroundx",
      },
    },
    defaultVariants: {
      backgroundColor: "Primary",
    },
  }
);

const bodyField = cva(["text-sm md:text-base sm:mt-4 sm:block"], {
  variants: {
    backgroundColor: {
      Default: "text-background/90",
      Primary: "text-primary-foreground/90x text-foreground/90",
      Secondary: "text-foreground/90",
      None: "text-foreground/90",
    },
  },
  defaultVariants: {
    backgroundColor: "Primary",
  },
});

const imagesContainer = cva(["grid md:grid-cols-1 h-full gap-8 col-auto "], {
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

interface ICtaComponent {
  images?: IImage[] | null;
  title: string;
  body: string;
  actions?: ILink[] | null;
  entryId: string;
  backgroundColor: ICta["fields"]["backgroundColor"];
}

const Cta: FC<ICtaComponent> = ({
  title,
  images,
  body,
  actions,
  entryId,
  backgroundColor,
}) => {
  type ImageCount = 0 | 1 | 2 | 3 | 4;

  const imageCount: ImageCount = Array.isArray(images)
    ? (images.length as ImageCount)
    : 0;
  return (
    <section>
      <div className="py-8 sm:px-6x lg:px-8x  spacing-component-max-width">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className={cx(metaSection({ backgroundColor }))}>
            <div className="mx-auto max-w-xl text-center">
              <h2
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"title"}
                className="text-2xl font-bold text-primary-foregroundx md:text-3xl"
              >
                {title}
              </h2>

              <p
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"body"}
                className={cx(bodyField({ backgroundColor }))}
              >
                {body}
              </p>

              <div
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"actionButtons"}
                className="mt-8  flex flex-wrap gap-4 text-center w-full"
              >
                {Array.isArray(actions) &&
                  actions?.map((btn: ILink, itx: number) => {
                    return (
                      <div key={`${btn.url}-${itx}`} className="w-full ">
                        <Button
                          as={Link}
                          href={btn.url}
                          target={btn.openInNewTab ? "_blank" : "_self"}
                          color={btn.color}
                          variant={btn?.variant}
                          size={btn?.size}
                        >
                          {btn?.label}
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          <div
            data-contentful-entry-id={entryId}
            data-contentful-field-id={"images"}
            className={cx(imagesContainer({ imageCount: imageCount || 0 }))}
            // classNamew="grid grid-cols-2 h-full gap-8 md:grid-cols-1 lg:grid-cols-2 col-auto "
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
        </div>
      </div>
    </section>
  );
};

export default Cta;
