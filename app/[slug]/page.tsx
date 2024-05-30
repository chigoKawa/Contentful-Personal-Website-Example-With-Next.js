// import LandingPage from "@/components/contentful/landing-page/landing-page";
import { ILandingPage } from "@/lib/contentful/interfaces/page";
import {
  fetchLandingPageWithSlug,
  fetchlandingpages,
} from "@/lib/contentful/landing-page";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

import { retrieveImageUrlFromMediaWrapper } from "@/lib/contentful/helpers/common";
import { MetaProps } from "@/lib/shared/interfaces/topics";
import dynamic from "next/dynamic";

const LandingPage = dynamic(
  () => import("@/components/contentful/landing-page/landing-page")
);

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const entry = (await fetchLandingPageWithSlug({
    slug: params?.slug,
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

export async function generateStaticParams() {
  const pages = await fetchlandingpages();
  try {
    const slugs = pages?.items.map((page: any) => {
      if (
        !page?.fields?.slug.startsWith("dynamic") &&
        page?.fields?.slug !== "blog" &&
        page?.fields?.slug !== "homepage"
      ) {
        return { slug: page?.fields?.slug };
      }
    });

    return slugs;
  } catch (error) {
    return [{ slug: "" }];
  }
}

// export const revalidate = 3600;
export default async function Home({ params }: { params: { slug: string } }) {
  const page = (await fetchLandingPageWithSlug({
    slug: params?.slug,
    preview: draftMode().isEnabled,
  })) as ILandingPage;

  if (!page || params?.slug?.startsWith("dynamic")) {
    return notFound();
  }
  return (
    <main className="min-h-screen w-full">
      <LandingPage page={page} isPreview={draftMode().isEnabled} />
    </main>
  );
}
