import React from "react";
import { BLOCKS, INLINES, MARKS, NodeData } from "@contentful/rich-text-types";
type Props = {
  children: any;
  node: any;
};

const RichTextTableCell = ({ node, children }: Props) => {
  return (
    <td
    style={{ border: "1px solid #dddddd" }}
    className="w-full border-2 border-lighter p-1"
  >
    {children}
  </td>
  );
};

export default RichTextTableCell;
