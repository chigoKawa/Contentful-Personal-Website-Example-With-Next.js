import { FC } from "react";

import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import {
  Image
} from "@nextui-org/react";
import MetaText from "./meta-text";

interface ISplitWithContentImage2 {
  title: string;
  body: string;
  link?: { label: string; href: string };
}

interface ISplitWithContentImage {
  img: IImage;
  headline: string[];
  body: string;
  actions?: ILink[] | null;
  entryId: string;
}

const SplitWithContentImage: FC<ISplitWithContentImage> = ({
  img,
  headline,
  body,
  actions,
  entryId,
}) => {
  return (
    <section>
      <div className="bg-background-100 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="">
            <Image
              isBlurred={img?.enableBlur}
              isZoomed={img?.enableZoom}
              radius={img?.radius || "none"}
              alt={img.alt}
              src={img.url}
              fallbackSrc={img.url}
              classNames={{
                img: "w-full h-full object-coverx ",
                wrapper: "h-full w-full",
                zoomedWrapper: "h-full w-full",
              }}
            />
          </div>

          <div className="order-last">
            <MetaText
              title={`${headline[0]}${headline[1] ? ` ${headline[1]}` : ``}`}
              body={body}
              actions={actions}
              entryId={entryId}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitWithContentImage;
