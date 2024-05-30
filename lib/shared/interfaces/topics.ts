import { Entry, EntryFields, Asset } from "contentful";
export interface IImage {
  url: string;
  alt: string;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  enableZoom?: boolean;
  enableBlur?: boolean;
}
export interface ILink {
  url: string;
  label: string;
  openInNewTab?: boolean;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning";
  size?: "sm" | "md" | "lg";
  variant?:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost";
}

export interface MetaProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
