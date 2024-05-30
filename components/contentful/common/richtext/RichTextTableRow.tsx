import React from "react";
import { BLOCKS, INLINES, MARKS, NodeData } from "@contentful/rich-text-types";
type Props = {
  children: any;
  node: any
};

const RichTextTableRow = ({ node, children }: Props) => {
  if (children.every((node : any) => node.nodeType === BLOCKS.TABLE_HEADER_CELL)) {
    // all children are header cells, so we should wrap the row
    // with a <thead /> tag
    return (
      <thead>
        <tr className="p-2"> {children}</tr>
      </thead>
    );
  } else {
    // not a header row, so we can render an ordinary <tr />
    return <tr className="p-2">{children}</tr>;
  }
};

export default RichTextTableRow;
