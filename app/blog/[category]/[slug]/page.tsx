import {
  fetchBlogWithSlug,
  fetchBlogsWithCategory,
} from "@/lib/contentful/blog-page";
import { retrieveImageUrlFromMediaWrapper } from "@/lib/contentful/helpers/common";
import { IBlogPostPage } from "@/lib/contentful/interfaces/page";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import BlogPage from "@/components/blog-page/blog-page";
type Props = {
  params: { category: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const { slug } = params;

  // fetch data
  const entry: IBlogPostPage | null = await fetchBlogWithSlug({
    slug: slug,
    preview: draftMode().isEnabled,
  });

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

  const author = entry?.fields.author
    ? `${entry?.fields.author?.fields?.firstName} ${
        entry?.fields.author?.fields?.lastName
          ? entry?.fields.author?.fields?.lastName
          : ""
      }`
    : "";
  const publishedDate = entry?.fields.publishedDate || "";
  const modifiedDate = entry?.sys.updatedAt || "";

  return {
    title: seo?.fields?.title || previousTitle,
    description: seo?.fields?.description || previousDescription,
    metadataBase: process.env.NEXT_PUBLIC_SITE_URL
      ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
      : new URL(`http://localhost:${process.env.PORT || 3000}`),

    openGraph: {
      images: images,
      type: "article",
      authors: [author],
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
    },
  };
}



export async function generateStaticParams({ params }: any) {
  // const pages = await fetchCategories();
  const pages = await fetchBlogsWithCategory(params.category);

  try {
    if (pages?.items) {
      const slugs = pages?.items.map((page: any) => {
        return { slug: page?.fields?.slug };
      });
      return slugs;
    }
    return [{ slug: "" }];
  } catch (error) {
    return [{ slug: "" }];
  }
}

export default async function Page({ params }: Props) {
  const entry: any = await fetchBlogWithSlug({
    slug: params?.slug,
    preview: draftMode().isEnabled,
  });

  if (!entry) {
    return notFound();
  }

  return (
    <div className="w-full max-w-screen-lg mx-auto text-inherit">
      <BlogPage blogEntry={entry} />
    </div>
  );
}
