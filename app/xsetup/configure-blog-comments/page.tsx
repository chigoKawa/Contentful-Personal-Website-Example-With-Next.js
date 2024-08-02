import React from "react";
import ConfigureComments from "./_components/configure-comments";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Cleaner Tool",
  description: `This tool will permanently delete all entries and content types from your Contentful space.`,
};

const Page = () => {
  return (
    <div>
      <ConfigureComments />
    </div>
  );
};

export default Page;
