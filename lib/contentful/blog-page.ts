import { client } from "./client";

import { BlogPostPageSkeleton } from "./interfaces/page";
const CONTENT_TYPE_NAME = "blogPost";

const INCLUDES_COUNT = 6;

export const fetchBlogs = async () => {
  return client().getEntries<BlogPostPageSkeleton>({
    content_type: CONTENT_TYPE_NAME,
    include: INCLUDES_COUNT,
  });
};

export const fetchBlogsWithCategory = async (category: string) => {
  try {
    const entries = await client().getEntries<BlogPostPageSkeleton>({
      content_type: CONTENT_TYPE_NAME,
      // @ts-ignore
      "fields.category.sys.contentType.sys.id": "categoryPage",
      "fields.category.fields.slug": category,
      include: INCLUDES_COUNT,
    });
   
    return entries;
  } catch (error) {
    console.error("I couldn't fetch anything");
  }
};

export const fetchBlogWithSlug = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await client(preview).getEntries<BlogPostPageSkeleton>({
      content_type: CONTENT_TYPE_NAME,
       // @ts-ignore
      "fields.slug": slug,
      include: INCLUDES_COUNT,
    });
    return response.items?.[0];
  } catch (error) {
    return null;
  }
};
