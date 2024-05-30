import React from "react";
import { BLOCKS, INLINES, MARKS, NodeData } from "@contentful/rich-text-types";
import { componentMap } from "../richtext-embed-mappings";

import ComponentResolver from "../../component-resolver";
// import ImageWrapper from "@/components/ctf/image-wrapper/image-wrapper";


type Props = {

  node: any
};

const EmbededAsset = ({ node }: Props) => {

  

  const entry  = node?.data?.target

return <></>
  // return <ImageWrapper  {...entry} />

  // return <ComponentResolver key={entry?.sys?.id} entry={entry} />

};

export default EmbededAsset;
