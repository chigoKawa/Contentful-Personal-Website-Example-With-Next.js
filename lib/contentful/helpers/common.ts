import { IImageWrapper, IPexelsImageWrapper } from "../interfaces/topics";
import { IImage } from "@/lib/shared/interfaces/topics";

import { ILink } from "@/lib/shared/interfaces/topics";
import { IBaseButton } from "@/lib/contentful/interfaces/blocks";
import { IExternalUrl } from "@/lib/contentful/interfaces/topics";
import {
  ILandingPage,
  ICategoryPage,
  IBlogPostPage,
} from "@/lib/contentful/interfaces/page";
import { Entry, EntryFields, Asset } from "contentful";

export const extractCtfImageUrl = (image: Asset | null): string => {
  const url: string = image?.fields?.file?.url?.toString() || "";
  if (url) return url;
  return "";
};

export const retrieveImageUrlFromMediaWrapper = (
  media: IPexelsImageWrapper | IImageWrapper
): IImage => {
  if (!media) {
    return {
      url: "",
      alt: "",
    };
  }
  const featuredImgType = media.sys.contentType.sys.id;
  const radiusMap: { [key: string]: "none" | "sm" | "md" | "lg" | "full" } = {
    None: "none",
    Small: "sm",
    Medium: "md",
    Large: "lg",
    Full: "full",
  };

  const getRadius = (radiusVal?: string) => radiusMap[radiusVal || "None"];

  if (featuredImgType === "imageWrapper") {
    const data = media as IImageWrapper;
    if (!data.fields?.image) {
      return {
        url: "",
        alt: "",
      };
    }
    return {
      url: (data.fields.image.fields.file?.url as string) || "",
      alt: data.fields.altText,
      enableZoom: data.fields?.enableZoom,
      enableBlur: data.fields?.enableBlur,
      radius: getRadius(data.fields?.radius),
    };
  }

  if (featuredImgType === "pexelsImageWrapper") {
    const data = media as IPexelsImageWrapper;
    const pexelsImage = data.fields.pexelsImage;
    return {
      url: pexelsImage?.src.original || "",
      alt: pexelsImage?.alt || "",
      enableZoom: data.fields?.enableZoom,
      enableBlur: data.fields?.enableBlur,
      radius: getRadius(data.fields?.radius),
    };
  }

  return { url: "", alt: "" };
};

export const retrieveUrlFromTarget = (
  target: IExternalUrl | ILandingPage | ICategoryPage | IBlogPostPage
) => {
  const contentType = target?.sys?.contentType?.sys?.id;
  if (contentType === "landingPage") {
    const entry = target as ILandingPage;
    if (entry?.fields?.slug === "homepage" || entry?.fields?.slug === "home") {
      return "/";
    }

    return `/${entry?.fields?.slug}`;
  }

  if (contentType === "externalLink") {
    const entry = target as IExternalUrl;

    return `${entry?.fields?.url}`;
  }
  if (contentType === "categoryPage") {
    const entry = target as ICategoryPage;

    return `/category/${entry?.fields?.slug}`;
  }
  if (contentType === "blogPostPage") {
    const entry = target as IBlogPostPage;

    return `/blog/${entry?.fields?.category?.fields?.slug}/${entry?.fields?.slug}`;
  }

  return "";
};

export const dateFormatter = (date: any) => {
  try {
    const inputDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      // timeZoneName: "short",
    };

    const formattedDate: string = inputDate.toLocaleDateString(
      "en-US",
      options
    );

    return formattedDate;
  } catch (error) {}
  return "";
};

export const transformBaseButtonToLink = (button: IBaseButton): ILink => {
  const colorMap: {
    [key: string]:
      | "default"
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning";
  } = {
    Default: "default",
    Primary: "primary",
    Secondary: "secondary",
    Success: "success",
    Danger: "danger",
    Warning: "warning",
  };

  const variantMap: {
    [key: string]:
      | "solid"
      | "bordered"
      | "light"
      | "flat"
      | "faded"
      | "shadow"
      | "ghost";
  } = {
    Solid: "solid",
    Bordered: "bordered",
    Light: "light",
    Flat: "flat",
    Faded: "faded",
    Shadow: "shadow",
    Ghost: "ghost",
  };

  const sizeMap: {
    [key: string]: "sm" | "md" | "lg";
  } = {
    Small: "sm",
    Medium: "md",
    Large: "lg",
  };

  const getColor = (val?: string) => colorMap[val || "Default"];
  const getVariant = (val?: string) => variantMap[val || "Solid"];
  const getSize = (val?: string) => sizeMap[val || "Medium"];



  const link: ILink = {
    label: button?.fields?.label,
    url: retrieveUrlFromTarget(button?.fields?.target),
    color: getColor(button?.fields?.color),
    variant: getVariant(button?.fields?.variant),
    size: getSize(button?.fields?.size) || "md",
  };

  return link;
};

export const isEmptyRichTextField = (richText: any) => {
  // Check if the richText object is empty

  if (!richText || !richText.content || richText.content.length === 0) {
    return true;
  }

  const isEmpty = richText.content.every((node: any) => {
    if (node.nodeType === "text" && node.value) {
      return node.value.trim() === "";
    } else if (node.nodeType === "embedded-entry-block") {
      return false; // If it's an embedded entry block (such as an image), it's not empty
    } else if (node.content) {
      return isEmptyRichTextField(node);
    }
    return true; // If it's not a text node and doesn't have content, consider it empty
  });

  return isEmpty;
};
