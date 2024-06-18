import React from "react";
import SpaceSetup from "./_components/space-setup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Space Setup Tool",
  description:
    "Fill your empty Contentful space with predefined content types and sample content for easy setup and quick start",
};

const Page = () => {
  return (
    <div>
      <SpaceSetup />
    </div>
  );
};

export default Page;
