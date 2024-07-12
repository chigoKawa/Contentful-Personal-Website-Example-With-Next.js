import BlogList from "@/components/contentful/blog-list/blog-list";
import { fetchBlogsWithCategory } from "@/lib/contentful/blog-page";
import {
  fetchCategories,
  fetchCategoryWithSlug,
} from "@/lib/contentful/category-page";
import { retrieveImageUrlFromMediaWrapper } from "@/lib/contentful/helpers/common";
import { ICategoryPage } from "@/lib/contentful/interfaces/page";
import type { Metadata, ResolvingMetadata } from "next";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";




type Props = {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params

  const { category } = params;

   // fetch data
   const entry: ICategoryPage | null = await fetchCategoryWithSlug({
    slug: category,
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
  const pages = await fetchCategories();
  try {
    const slugs = pages?.items.map((page: any) => {
      return { category: page?.fields?.slug };
    });

    return slugs;
  } catch (error) {
    return [{ category: "" }];
  }
}

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const entry: any = await fetchCategoryWithSlug({
    slug: params?.category,
    preview: draftMode().isEnabled,
  });
  const categoryBlogs = await fetchBlogsWithCategory(params.category);

  if (!entry) {
    return notFound();
  }

  return (
    <div className="spacing-component-max-width px-2 py-20">
       {/* <pre className="">{JSON.stringify(categoryBlogs, null , 2)}</pre> */}
      <h1 className="py-10 text-2xl">{entry.fields.title}</h1>
      

      {categoryBlogs?.items && (
        <BlogList total={categoryBlogs?.total} blogs={categoryBlogs?.items} />
      )}
      
    </div>
  );
}
