import { client } from "./client";

import { LandingPageSkeleton } from "./interfaces/page";
const CONTENT_TYPE_NAME = "landingPage";

const INCLUDES_COUNT = 6;

export const fetchlandingpages = async () => {
  return client().getEntries<LandingPageSkeleton>({
    content_type: CONTENT_TYPE_NAME,
    include: INCLUDES_COUNT,
  });
};

export const fetchLandingPageWithSlug = async ({
  slug,
  preview = false,
}: {
  slug: string;
  preview?: boolean;
}) => {
  try {
    const response = await client(preview).getEntries<LandingPageSkeleton>({
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