import { Entry, EntryFields, Asset } from "contentful";

export interface IExternalUrl extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    title: EntryFields.Symbol;
    url: EntryFields.Symbol;
    optionalIcon?: EntryFields.Symbol<
      "Twitter" | "Instagram" | "Facebook" | "TikTok" | "LinkedIn" | "Github"
    >;
  };
}
export type ExternalUrlSkeleton = {
  contentTypeId: "externalUrl";
  fields: IExternalUrl["fields"];
};

export interface IImageWrapper extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    altText: EntryFields.Symbol;
    image: Asset;
    enableZoom?: EntryFields.Boolean;
    enableBlur?: EntryFields.Boolean;
    radius?: EntryFields.Symbol<"None" | "Small" | "Medium" | "Large" | "Full">;
  };
}

export interface IVideoWrapper extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    title?: EntryFields.Symbol;
    url?: EntryFields.Symbol;
    contentfulVideo?: Asset;
    // enableZoom?: EntryFields.Boolean;
    // enableBlur?: EntryFields.Boolean;
    videoSource: EntryFields.Symbol<  "Youtube"|
    "Wistia"|
    "Contentful" >;
  };
}


export interface ISeo extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    title: EntryFields.Symbol;
    description: EntryFields.Symbol;
    ogImage: IPexelsImageWrapper | IImageWrapper;
    noIndex: EntryFields.Boolean;
    noFollow: EntryFields.Boolean;
  };
}
export type SeoSkeleton = {
  contentTypeId: "seo";
  fields: ISeo["fields"];
};

export interface IPerson extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    firstName: EntryFields.Symbol;
    lastName?: EntryFields.Symbol;
    avatar?: Asset;
    bio?: EntryFields.RichText;
    website?: IExternalUrl;
    twitterProfileUrl?: EntryFields.EntryLink<ExternalUrlSkeleton>;
    linkedinProfileUrl?: EntryFields.EntryLink<ExternalUrlSkeleton>;
  };
}
export interface ICodeSnippet extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    codeBlock: EntryFields.Text;
    language: EntryFields.Symbol;
  };
}

export interface ITopicDefinition extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    topic: EntryFields.Symbol;
    definition: EntryFields.Text;
  };
}

export type ImageWrapperSkeleton = {
  contentTypeId: "imageWrapper";
  fields: IImageWrapper["fields"];
};

type JsonObject = { [key: string]: any };
export interface IPexelsPhotoData extends JsonObject {
  photographer: string;
  photographer_url: string;
  image: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
  avg_color: string;
  url: string;
  attribution: string;
  photographer_attribution: string;
  width: number;
  height?: number;
}

export interface IPexelsImageWrapper extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    pexelsImage: EntryFields.Object<IPexelsPhotoData>;
    enableZoom?: EntryFields.Boolean;
    enableBlur?: EntryFields.Boolean;
    radius?: EntryFields.Symbol<"None" | "Small" | "Medium" | "Large" | "Full">;
  };
}

export type PexelsImageWrapperSkeleton = {
  contentTypeId: "pexelsImageWrapper";
  fields: IPexelsImageWrapper["fields"];
};
