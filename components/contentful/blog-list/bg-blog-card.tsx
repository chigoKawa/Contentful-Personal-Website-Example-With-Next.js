import React, { FC } from "react";
import { IImage } from "@/lib/shared/interfaces/topics";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import RichTextLoader, {
  RichTextLoaderSkeleton,
} from "@/components/contentful/common/richtext-loader";

interface IProps {
  title: string;
  image: IImage;
  author: string;
  date: string;
  href: string;
  tag?: string;
  summary?: any;
}

const BgBlogCard: FC<IProps> = ({
  title,
  image,
  author,
  date,
  tag,
  href,
  summary,
}) => {
  return (
    <div className="group transition-ease ">
      <Link className=" " href={href}>
        <article className="relative  overflow-hidden rounded-lgx rounded-xl shadow transition hover:shadow-lg">
          <img
            alt={image.alt}
            src={image.url}
            className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-95 transition-ease "
          />

          <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
            {tag && (
              <div className="absolute  z-30 translate top-2 right-2 ">
                <Chip color="primary">{tag}</Chip>
              </div>
            )}
            <div className="p-4 sm:p-6 bg-background bg-opacity-50 ">
              {date}

              <a href="#">
                <h3 className="mt-0.5 text-lg line-clamp-1">{title}</h3>
              </a>

              <p className="mt-2 line-clamp-3 text-sm/relaxed text-foreground/95">
                {/* {summary} */}
                <RichTextLoader richy={summary} />
              </p>
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
};

export default BgBlogCard;
