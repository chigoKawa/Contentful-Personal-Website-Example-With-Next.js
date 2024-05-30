import { Entry, EntryFields, Asset } from "contentful";
import { IExternalUrl } from "./topics";
import { AnnouncementSkeleton, HeroBannerSkeleton } from "./components";
import { SeoSkeleton, ISeo } from "./topics";
import {
  IPexelsImageWrapper,
  PexelsImageWrapperSkeleton,
  IImageWrapper,
  ImageWrapperSkeleton,
  IPerson,
} from "./topics";
import { IHeroBanner, ICta } from "./components";

export interface ICategoryPage extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    introText?: EntryFields.RichText;
    body: EntryFields.RichText;
    announcement: EntryFields.EntryLink<AnnouncementSkeleton>;
    seo?: ISeo;
    heroBanner?: EntryFields.EntryLink<HeroBannerSkeleton>;
    //   content?: contentful.EntryFields.Array<
    //   contentful.EntryFields.EntryLink<HeroBannerSkeleton | DuplexSectionSkeleton>
    // >;
  };
}

export type CategoryPageSkeleton = {
  contentTypeId: "categoryPage";
  fields: ICategoryPage["fields"];
};
export interface IBlogPostPage extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    publishedDate?: EntryFields.Date;
    introText?: EntryFields.RichText;
    body: EntryFields.RichText;
    featuredImage: IImageWrapper | IPexelsImageWrapper;
    announcement: EntryFields.EntryLink<AnnouncementSkeleton>;
    seo?: ISeo;
    author?: IPerson;
    category?: EntryFields.EntryLink<CategoryPageSkeleton>;
    //   content?: contentful.EntryFields.Array<
    //   contentful.EntryFields.EntryLink<HeroBannerSkeleton | DuplexSectionSkeleton>
    // >;
  };
}

export type BlogPostPageSkeleton = {
  contentTypeId: "blogPostPage";
  fields: IBlogPostPage["fields"];
};

export interface ILandingPage extends Entry {
  fields: {
    internalName: EntryFields.Symbol;
    title: EntryFields.Symbol;
    slug: EntryFields.Symbol;
    heroBanner: EntryFields.EntryLink<HeroBannerSkeleton>;
    // announcement: EntryFields.EntryLink<AnnouncementSkeleton>;
    seoMetadata?: ISeo;
    content: EntryFields.Array<IHeroBanner | ICta>;
  };
}

export type LandingPageSkeleton = {
  contentTypeId: "landingPage";
  fields: ILandingPage["fields"];
};
