import BlogList from "@/components/contentful/blog-list/blog-list";
import { fetchBlogs } from "@/lib/contentful/blog-page";
import { ILandingPage } from "@/lib/contentful/interfaces/page";
import {
  fetchLandingPageWithSlug
} from "@/lib/contentful/landing-page";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";

import { retrieveImageUrlFromMediaWrapper } from "@/lib/contentful/helpers/common";
import { MetaProps } from "@/lib/shared/interfaces/topics";
import dynamic from "next/dynamic";

const LandingPage = dynamic(
  () => import("@/components/contentful/landing-page/landing-page")
);

const PAGE_SLUG = "blog";

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const entry = (await fetchLandingPageWithSlug({
    slug: PAGE_SLUG,
    preview: draftMode().isEnabled,
  })) as ILandingPage;
  const seo = entry?.fields?.seoMetadata;

  const previousTitle = (await parent).title || "";
  const previousDescription = (await parent).description || "";
  const previousImages = (await parent).openGraph?.images || [];
  const extractedImage = seo?.fields?.ogImage
    ? retrieveImageUrlFromMediaWrapper(seo?.fields?.ogImage)
    : null;
  const image = extractedImage?.url
    ? `https:${extractedImage?.url}?fm=png`
    : "";

  let images = [...previousImages];
  if (extractedImage) {
    images = [`https:${extractedImage?.url}`];
  }

  return {
    title: seo?.fields?.title || previousTitle,
    description: seo?.fields?.description || previousDescription,
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : new URL(`http://localhost:${process.env.PORT || 3000}`),
    openGraph: {
      // images: [image, ...previousImages]
      images: images,
    },
  };
}

const BlogPage = async () => {
  const blogs = await fetchBlogs();
  const blogpage = (await fetchLandingPageWithSlug({
    slug: PAGE_SLUG,
    preview: draftMode().isEnabled,
  })) as ILandingPage;
  return (
    <div>
      <div className="min-h-screen w-full">
        <LandingPage page={blogpage} isPreview={draftMode().isEnabled}>
   
          <div className="spacing-component-max-width px-2 py-10">
            {blogs?.items && (
              <BlogList total={blogs?.total} blogs={blogs?.items} />
            )}
          </div>
        </LandingPage>
      </div>
    </div>
  );
};

export default BlogPage;
