import { ILandingPage } from "@/lib/contentful/interfaces/page";
import { fetchLandingPageWithSlug } from "@/lib/contentful/landing-page";
import { MetaProps } from "@/lib/shared/interfaces/topics";
import { Progress } from "@nextui-org/react";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";

// import LandingPage from "@/components/contentful/landing-page/landing-page";
import {
  retrieveImageUrlFromMediaWrapper
} from "@/lib/contentful/helpers/common";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const LandingPage = dynamic(
  () => import("@/components/contentful/landing-page/landing-page")
);

const HOMEPAGE_SLUG = "home";

export async function generateMetadata(
  { params, searchParams }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const entry = (await fetchLandingPageWithSlug({
    slug: HOMEPAGE_SLUG,
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

export default async function Home() {
  const homepage = (await fetchLandingPageWithSlug({
    slug: HOMEPAGE_SLUG,
    preview: draftMode().isEnabled,
  })) as ILandingPage;
  return (
    <section className="flex flex-col items-center justify-center gap-4x py-8x md:py-10x">
      {/* <pre className="">{JSON.stringify(homepage, null , 2)}</pre> */}

      <Suspense
        fallback={
          <Progress
            size="sm"
            isIndeterminate
            aria-label="Loading..."
            className="w-full"
          />
        }
      >
        <LandingPage page={homepage} isPreview={draftMode().isEnabled} />
      </Suspense>
    </section>
  );
}
