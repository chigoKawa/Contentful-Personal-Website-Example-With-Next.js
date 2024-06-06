import { FC } from "react";

import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import {
  Button,
  Card,
  CardHeader,
  Image,
  Link
} from "@nextui-org/react";

interface IBannerWithBg {
  img: IImage;
  headline: string[];
  body: string;
  actions?: ILink[] | null;
  entryId: string;
}

export function arrayCeil(arr: any, number: number) {
  const sorted = arr.sort((a: any, b: any) => a - b);

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > number) {
      return sorted[i];
    }
  }

  // If no index found return the last element
  return sorted[sorted.length - 1];
}

const BannerWithBg: FC<IBannerWithBg> = ({
  img,
  headline,
  body,
  actions,
  entryId,
}) => {
  return (
    <div className="">
      <Card
        isBlurred
        radius="none"
        className="col-span-12 sm:col-span-4 h-[600px]"
      >
        <CardHeader className="absolute z-10 bottom-20 flex-col !items-start">
          <div className="relative max-w-screen-xl  w-full m-auto px-4  ">
            <div className=" w-full text-white ">
              <h1
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"headline"}
                className="text-3xl font-extrabold sm:text-5xl"
              >
                {headline[0]}
                {headline[1] && (
                  <strong className="block font-extrabold text-primary-500">
                    {headline[1]}
                  </strong>
                )}
              </h1>

              <p
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"body"}
                className="mt-4 max-w-lg sm:text-xl/relaxed"
              >
                {body}
              </p>

              <div
                data-contentful-entry-id={entryId}
                data-contentful-field-id={"actionButtons"}
                className="mt-8 flex  flex-wrap gap-4 text-center"
              >
                {Array.isArray(actions) &&
                  actions?.map((btn: ILink, itx: number) => {
                    return (
                      <div key={`${btn.url}-${itx}`} className="w-fullx ">
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
        </CardHeader>

        <Image
          isZoomed={img?.enableZoom}
          isBlurred={img.enableBlur}
          radius={img.radius}
          removeWrapper
          alt={img.alt}
          className="z-0 w-full h-full object-cover !bg-opacity-5 backdrop-filter"
          src={img.url}
          fallbackSrc={`${img.url}?w=100`}
          loading="lazy"
        />
      </Card>
    </div>
  );


};

export default BannerWithBg;
