"use client";
import { dateFormatter, retrieveImageUrlFromMediaWrapper, transformTimestamp } from "@/lib/contentful/helpers/common";
import { IBlogPostPage } from "@/lib/contentful/interfaces/page";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";
import React, { useState } from "react";
import BgBlogCard from "./bg-blog-card";

// import richtextOptions from "../richtext/richtext-options";
import generateOptions from "@/components/contentful/common/richtext/richtext-options";
import SimpleBlogCard from "./simple-blog-card";

// import RichTextLoader from "../common/richtext-loader";



// const BlogCard = dynamic(() => import("@/components/blog-card/blog-card"), {
//   loading: () => <BlogCardSkeleton />,
// });
interface IBlogListProps {
  blogs: IBlogPostPage[];
  total: number;
}

const BlogsWrapper = ({ post }: { post: IBlogPostPage }) => {
  const imgData = retrieveImageUrlFromMediaWrapper(post?.fields?.featuredImage);
  const category = post?.fields?.category?.fields?.slug;


  const author = post?.fields?.author?.fields?.firstName
    ? `${post?.fields?.author?.fields?.firstName}${
        post?.fields?.author?.fields?.lastName
          ? ` ${post?.fields?.author?.fields?.lastName}`
          : ``
      }`
    : "";

  // const summary = "";
  const tag : string = post?.fields?.category?.fields?.title || "";
  const publishedDate = post?.fields?.publishedDate;
  const title = post?.fields?.title;

  if (!imgData) {
    return <>...</>;
  }

  return (
    <BgBlogCard
      href={`/blog/${category}/${post?.fields?.slug}`}
      tag={tag || ""}
      date={transformTimestamp(publishedDate as string)}
      image={imgData}
      title={title}
      author={author || ""}
      summary={post?.fields?.summary}
    />
  );

  return (
    <SimpleBlogCard
      href={`/blog/${category}/${post?.fields?.slug}`}
      tag={tag || ""}
      date={transformTimestamp(publishedDate as string)}
      image={imgData}
      title={title}
      author={author || ""}
    />
  );


  return (
    <Link
      className=" "
      key={`key-${post?.sys.id}`}
      href={`/blog/${category}/${post?.fields?.slug}`}
    >
      <div className="w-80  ">
        <article className="w-80 relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
          <img src={imgData?.url} />
          {tag && (
            <div className="absolute z-50 translate top-2 right-2 ">
              <Chip color="primary">{tag}</Chip>
            </div>
          )}
          <div className="relative bg-gradient-to-t from-foreground-900/50 to-foreground-900/25 ">
            <div className="p-4 sm:p-6">
              {publishedDate && (
                <time
                  dateTime={publishedDate}
                  className="block text-xs text-foreground/90"
                >
                  {dateFormatter(publishedDate)}
                </time>
              )}

              <div className="flex flex-col ">
                <div className="">
                  <a href="#">
                    <h3 className="mt-0.5 text-lg ">{title}</h3>
                  </a>
                </div>
                {/* <p className="mt-2 line-clamp-3x text-sm/relaxed text-foreground/95">
                {summary}
              </p> */}
              </div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );


};
const BlogList: React.FC<IBlogListProps> = ({ blogs, total }) => {
  const [blogPosts, setBlogPosts] = useState(blogs);
  return (
    <div className="p-2  ">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4x lg:gap-4x gap-6  ">
        {blogPosts?.map((post, px) => {
          return <BlogsWrapper key={`key-${post?.sys.id}-${px}`} post={post} />;
        })}
      </div>
    </div>
  );
};

export default BlogList;
