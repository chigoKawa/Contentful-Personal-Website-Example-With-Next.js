import { Entry, EntryFields, Asset } from "contentful";
import { IExternalUrl } from "./topics";
import { ILandingPage } from "./page";
import { IPexelsImageWrapper } from "./topics";

export interface IBaseButton extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    label: EntryFields.Symbol;
    target: IExternalUrl;
    openInNewTab?: EntryFields.Boolean;
    color: EntryFields.Symbol<
      "Default" | "Primary" | "Secondary" | "Success" | "Danger" | "Warning"
    >;
    size: EntryFields.Symbol<"Small" | "Medium" | "Large">;
    variant: EntryFields.Symbol<
      "Solid" | "Bordered" | "Light" | "Flat" | "Faded" | "Shadow" | "Ghost"
    >;
  };
}

export interface INavigationItem extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    label: EntryFields.Symbol;
    target?: IExternalUrl | ILandingPage;
    subNavigationItems?: EntryFields.Array<INavigationItem>;
  };
}

export interface INavigationMenu extends Entry {
  fields: {
    internalTitle: EntryFields.Symbol;
    title: EntryFields.Symbol;
    siteName: EntryFields.Symbol;
    siteLogo: Asset;
    content: EntryFields.Array<INavigationItem>;
    socialLinks: EntryFields.Array<IExternalUrl>;
    footerSections: EntryFields.Array<INavigationItem>;
    font: EntryFields.Symbol<
      | "Inter"
      | "Lato"
      | "Merriweather"
      | "Noto_Sans_Hanunoo"
      | "Poppins"
      | "Roboto_Mono"
      | "Lora"
      | "Montserrat"
      | "Open_Sans"
      | "Playfair_Display"
      | "Raleway"
      | "Nunito"
    >;
  };
}

export type INavigationMenuPageSkeleton = {
  contentTypeId: "navigationMenu";
  fields: INavigationMenu["fields"];
};
