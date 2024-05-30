import React from "react";
import { BLOCKS, INLINES, MARKS, NodeData } from "@contentful/rich-text-types";
type Props = {
  children: any;
  node: any
};

const RichTextTable = ({ node, children }: Props) => {
  return (
    <table
      // key={node}
      style={{ borderSpacing: "collapse" }}
      className="w-full table-fixed border-spacing-2 border-separate border rounded-md border-lighter p-2x shadow shadow-lighter "
    >
      <tbody>
      {children}
      </tbody>
   
    </table>
  );
};

export default RichTextTable;
