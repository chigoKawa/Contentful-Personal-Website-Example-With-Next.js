import { client } from "./client";

import { LandingPageSkeleton } from "./interfaces/page";
import {
  INavigationItem,
  INavigationMenuPageSkeleton,
} from "./interfaces/blocks";
const CONTENT_TYPE_NAME = "navigationMenu";

const INCLUDES_COUNT = 6;

export const fetchNavMenus = async (preview = false) => {

  try {
    const response = await client(preview).getEntries<INavigationMenuPageSkeleton>({
      content_type: CONTENT_TYPE_NAME,
      include: INCLUDES_COUNT,
    });
    return response.items?.[0];
    
  } catch (error) {
    return null;
  }

};

export const fetchNavMenuById = async ({
  id,
  preview = false,
}: {
  id: string;
  preview?: boolean;
}) => {
  try {
    const response = await client(
      preview
    ).getEntries<INavigationMenuPageSkeleton>({
      content_type: CONTENT_TYPE_NAME,
      // @ts-ignore
      "sys.id": id,
      include: INCLUDES_COUNT,
    });
    return response.items?.[0];
  } catch (error) {
    return null;
  }
};
