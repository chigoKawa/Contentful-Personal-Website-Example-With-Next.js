import { client } from "./client";

import { CategoryPageSkeleton } from "./interfaces/page";
const CONTENT_TYPE_NAME = "categoryPage"

const INCLUDES_COUNT = 6


export const fetchCategories = async () => {
  return client().getEntries<CategoryPageSkeleton>({
    content_type: CONTENT_TYPE_NAME,
    include: INCLUDES_COUNT
  });
};



export const fetchCategoryWithSlug = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await client(preview).getEntries<CategoryPageSkeleton>({
      content_type: CONTENT_TYPE_NAME,
      // @ts-ignore
      "fields.slug": slug,
      include: INCLUDES_COUNT,
    });
    return response.items?.[0]
    
  } catch (error) {
    return null;
  }
};
