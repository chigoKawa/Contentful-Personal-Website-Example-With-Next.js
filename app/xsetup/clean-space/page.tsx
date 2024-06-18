import React from "react";
import SpaceSetup from "./_components/space-cleaner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Cleaner Tool",
  description: `This tool will permanently delete all entries and content types from your Contentful space.`,
};

const Page = () => {
  return (
    <div>
      <SpaceSetup />
    </div>
  );
};

export default Page;
