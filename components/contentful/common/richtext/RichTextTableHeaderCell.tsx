import React from "react";
import { BLOCKS, INLINES, MARKS, NodeData } from "@contentful/rich-text-types";
type Props = {
  children: any;
  node: any;
};

const RichTextTableHeaderCell = ({ node, children }: Props) => {
  return (
    <th
    style={{ border: "1px solid #dddddd" }}
    className="font-semi text-2xl w-full border-lighter text-left p-1 "
  >
    {children}
  </th>
  );
};

export default RichTextTableHeaderCell;
