"use client";
import BlogAuthor from "@/components/atoms/blog-author";
import {
  dateFormatter,
  retrieveImageUrlFromMediaWrapper,
} from "@/lib/contentful/helpers/common";
import { IBlogPostPage } from "@/lib/contentful/interfaces/page";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Image } from "@nextui-org/react";
import React from "react";
import Cusdis from "@/lib/Cusdis";
import CoralEmbed from "@/lib/CoralEmbed";


import generateOptions from "@/components/contentful/common/richtext/richtext-options";

interface IBlogEntryProps {
  blogEntry: IBlogPostPage;
}
const BlogPage: React.FC<IBlogEntryProps> = ({ blogEntry }) => {
  const { fields, metadata, sys } = blogEntry;

  // const { slug, author, featuredImage, summary, body, title, publishedDate } =
  //   fields;
  const { slug, author, featuredImage, summary, body, title, publishedDate } =
    fields;

  const image = retrieveImageUrlFromMediaWrapper(
    blogEntry?.fields?.featuredImage
  );

  const {
    firstName = "",
    lastName = "",
    avatar: avatarField,
    website,
    linkedinProfileUrl,
    twitterProfileUrl,
    bio,
  } = author?.fields || {};

  const authorName = `${firstName} ${lastName}`;

  const avatar = avatarField?.fields?.file?.url || "";

  const authorWebsite =
    website ||
    linkedinProfileUrl?.fields?.url ||
    twitterProfileUrl?.fields?.url ||
    "/";
  return (
    <div className="mx-auto prose md:prose-lg lg:prose-xl  text-inherit pb-4">
      <article
        className="mx-auto w-full"
        itemScope
        itemType="https://schema.org/BlogPosting"
        itemID={`/blog/${slug}`}
      >
        <div className="w-full mx-auto mb-4">
          <Image
            isBlurred={image?.enableBlur}
            isZoomed={image?.enableZoom}
            radius={image?.radius || "none"}
            alt={image.alt}
            src={image.url}
            fallbackSrc={image.url}
            classNames={{
              img: "w-full h-full object-coverx ",
              wrapper: "h-full w-full",
              zoomedWrapper: "h-full w-full",
            }}
          />
        </div>
        <div className="gap-4 px-4 mb-4">
          {Array.isArray(metadata?.tags) &&
            metadata?.tags?.map((tag, tgx) => {
              return (
                <span
                  key={`key-${tgx}-${tag?.sys?.id}`}
                  className="bg-accent-200 text-primary-800 text-xs font-bold me-2 px-2.5 py-0.5 rounded border border-primary-400"
                >
                  {tag?.sys?.id}
                </span>
              );
            })}
        </div>

        <header className="mb-4 lg:mb-6 not-format px-4">
          <BlogAuthor
            name={authorName}
            avatar={avatar as string}
            website={authorWebsite as string}
            publishedDate={publishedDate ? dateFormatter(publishedDate) : ""}
            rawPublishedDate={publishedDate}
            bio={
              author?.fields?.bio
                ? documentToReactComponents(
                    author?.fields?.bio,
                    generateOptions()
                  )
                : ""
            }
          />
          <h1 itemProp="name" className="mb-4 text-inherit ">
            {title}
          </h1>
        </header>

        <div itemProp="abstract" className="px-4">
          {summary && (
            <div className="mb-4">
              {documentToReactComponents(summary, generateOptions())}
            </div>
          )}
          <div itemProp="articleBody" className="overflow-hidden w-full ">
            {documentToReactComponents(body, generateOptions())}
          </div>
     
        </div>
      </article>

      {/* <div className="!bg-background p-2">
        <Cusdis
          appId={"7a4345e5-5421-4e9a-b98c-1cce76a245c2"}
          pageId={sys?.id}
          pageUrl={`/blog/${fields?.slug}`}
          pageTitle={`${fields.title}`}
        />
      </div> */}
 
      {/* <div className="">
        <CoralEmbed
          storyID={sys?.id}
          storyURL={`http://localhost:3000/blog/${fields?.slug}`}
        />
      </div> */}
    </div>
  );
};

export default BlogPage;
