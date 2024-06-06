import React from "react";
import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";

interface IProps {
  name: string;
  avatar?: string;
  bio?: any;
  website?: string;
  publishedDate?: string;
  rawPublishedDate?: string;
}

const BlogAuthor: React.FC<IProps> = ({
  name,
  avatar,
  bio,
  website = "/",
  publishedDate,
  rawPublishedDate,
}) => {
  return (
    <address
      itemProp="author"
      itemScope
      itemType="http://schema.org/Person"
      className="flex items-center mb-6 not-italic text-inherit"
    >
      <div className="inline-flex items-center mr-3 text-sm text-inherit ">
        <img
          className="mr-4 w-14 h-14 md:w-16 md:h-16 rounded-full"
          src={avatar || "http://i.pravatar.cc/300"}
          alt={name}
          itemProp="image"
        />
        <div>
          <Link
            itemProp="url"
            target="_blank"
            href={website}
            rel="author"
            className="text-inherit no-underline"
          >
            <span
              itemProp="name"
              className="text-xl font-bold no-underline text-primary-900 dark:text-background-foreground-500"
            >
              {name}
            </span>
          </Link>

          {publishedDate && (
            <p
              itemProp="description"
              className="text-base text-primary-900/[0.6] dark:text-background-foreground-500/[0.4]"
            >
              <time
                itemProp="datePublished"
                content={rawPublishedDate}
                dateTime={rawPublishedDate}
                title={publishedDate}
              >
                {publishedDate}
              </time>
            </p>
          )}
        </div>
      </div>
    </address>
  );
};

export default BlogAuthor;
