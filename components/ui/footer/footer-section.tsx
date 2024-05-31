import React, { FC } from "react";
import {
  INavigationMenu,
  INavigationItem,
} from "@/lib/contentful/interfaces/blocks";
import {
  retrieveImageUrlFromMediaWrapper,
  retrieveUrlFromTarget,
} from "@/lib/contentful/helpers/common";

interface IProps {
  section: INavigationItem;
}
const FooterSection: FC<IProps> = ({ section }) => {
  return (
    <div className="text-center sm:text-left">
      <p
        data-contentful-entry-id={section?.sys?.id}
        data-contentful-field-id={"label"}
        className="text-lg font-medium text-foreground-900"
      >
        {section?.fields?.label}
      </p>

      <ul className="mt-8 space-y-4 text-sm">
        {section?.fields?.subNavigationItems?.map((nvItem, nvx) => {
          return (
            <li
              data-contentful-entry-id={nvItem?.sys?.id}
              data-contentful-field-id={"label"}
              key={`${nvItem?.sys?.id}-${nvx}`}
              className="!list-none"
            >
              <a
                target="_blank"
                className="text-foreground-700 transition hover:text-foreground-700/75"
                href={
                  nvItem.fields.target
                    ? retrieveUrlFromTarget(nvItem.fields.target)
                    : "/"
                }
              >
                {nvItem?.fields?.label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterSection;
