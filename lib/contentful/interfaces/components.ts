import { Entry, EntryFields, Asset } from "contentful";
import { IBaseButton } from "./blocks";
import { IExternalUrl, IPexelsImageWrapper, IImageWrapper } from "./topics";


export interface ICta extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    title?: EntryFields.Symbol;
    images: EntryFields.Array<IPexelsImageWrapper | IImageWrapper>;
    body?: EntryFields.Text;
    actionButtons: EntryFields.Array<IBaseButton>;
    backgroundColor: EntryFields.Symbol<"Primary" | "Secondary" | "Default" | "None">;

  };
}

export interface IRichContentBlock extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    body: EntryFields.RichText;
    images?: EntryFields.Array<IPexelsImageWrapper | IImageWrapper>;
    backgroundColor: EntryFields.Symbol<"Primary" | "Secondary" | "Default" | "None">;

  };
}

export interface IHeroBanner extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    headline?: EntryFields.Array<EntryFields.Symbol>;
    image: IPexelsImageWrapper | IImageWrapper;
    body?: EntryFields.Text;
    variant: EntryFields.Symbol<"Primary" | "Centered" | "With Background Image">;
    actionButtons: EntryFields.Array<IBaseButton>;
  };
}
export type HeroBannerSkeleton = {
  contentTypeId: "heroBanner";
  fields: IHeroBanner["fields"];
};
export interface IAnnouncement extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    message: EntryFields.Symbol;
    action: IBaseButton;
    expiryDate?: EntryFields.Date;
  };
}
export type AnnouncementSkeleton = {
  contentTypeId: "announcement";
  fields: IAnnouncement["fields"];
};

