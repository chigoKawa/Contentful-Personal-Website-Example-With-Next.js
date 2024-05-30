"use client";
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from "@contentful/live-preview/react";
import Reacr from "react";
import ComponentResolver from "@/components/contentful/common/component-resolver";
import ReferenceFieldMapper from "@/components/contentful/common/reference-field-mapper";
import { ILandingPage } from "@/lib/contentful/interfaces/page";

type Props = {
  // lesson: ILessonEntry | undefined;
  page: ILandingPage;
  children?: any;
  isPreview: boolean;
};
const LandingPage = ({ page: rawPage, children, isPreview }: Props) => {
  const page = useContentfulLiveUpdates(rawPage) || rawPage;
  // const inspectorProps = useContentfulInspectorMode()
  const heroBanner = isPreview
    ? page?.fields?.heroBanner
    : rawPage?.fields?.heroBanner;

  // const { availableWorkshops: workshops } = usePageContext();

  if (!page) {
    return <div className="h-screenx"></div>;
  }
  return (
    <div className="w-full h-full ">
      {/* {JSON.stringify(page?.fields)} */}

      {heroBanner ? (
        <ComponentResolver field={heroBanner} />
      ) : (
        <div className="pt-24 lg:pt-40 "></div>
      )}

      {children}

      <div className="flex flex-col space-y-4 ">
        <div className="">
          <ReferenceFieldMapper
            fields={
              isPreview ? page?.fields?.content : rawPage?.fields?.content
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
