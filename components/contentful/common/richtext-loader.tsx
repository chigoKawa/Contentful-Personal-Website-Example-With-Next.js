"use client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import richtextOptions from "../richtext/richtext-options";
import generateOptions from "@/components/contentful/common/richtext/richtext-options";
import { useState, useEffect } from "react";
import { Skeleton } from "@nextui-org/react";

export const RichTextLoaderSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Skeleton className="h-3 w-4/5 rounded-lg"/>
      <Skeleton className="h-3 w-5/5 rounded-lg" />
      <Skeleton className="h-3 w-5/5 rounded-lg" />
    </div>
  );
};

const RichTextLoader = ({ richy }: { richy: any }) => {
  const [loadedContent, setLoadedContent] = useState<any>(null);

  useEffect(() => {
    const loadedRt = richy
      ? documentToReactComponents(richy, generateOptions())
      : "";

    setLoadedContent(loadedRt);

    return () => {};
  }, []);

  if (!loadedContent) {
  
    return <RichTextLoaderSkeleton />;
  }

  return loadedContent;
};

export default RichTextLoader;
