"use client";
import { BLOCKS, INLINES, MARKS, NodeData } from "@contentful/rich-text-types";

// import FieldRender from "@/components/Page/FieldRender";
import React, { FC, ReactNode } from "react";
import BoldText from "./BoldText";
import RegularText from "./RegularText";
import RichTextTable from "./RichTextTable";
import RichTextTableRow from "./RichTextTableRow";
import RichTextTableCell from "./RichTextTableCell";
import RichTextTableHeaderCell from "./RichTextTableHeaderCell";
import BlockEmbed from "./BLOCK/BlockEmbed";
import RichTextCodeMark from "./RichTextCodeMark";
import HYPERLINK from "./INLINES/HYPERLINK";
import AssetHYPERLINK from "./INLINES/AssetHYPERLINK";
import InlineEmbed from "./INLINES/InlineEmbed";
import EntryHYPERLINK from "./INLINES/EntryHYPERLINK";
import EmbededAsset from "./BLOCK/EmbededAsset";
import dynamic from "next/dynamic";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

// const BlockEmbed = dynamic(()=> import("./BLOCK/BlockEmbed"), {ssr: false})

type NodeChildrenType = { node: any; children: any };

const OrderedList = ({ node, children }: NodeChildrenType) => {
  return <ol className="list-outside px-4 ml-4">{children}</ol>;
};
const UnorderedList = ({ node, children }: NodeChildrenType) => {
  return (
    <ul className=" marker:text-accent my-6 ml-6 list-disc [&>li]:mt-2 ">
      {children}
    </ul>
  );
};

const ListItem = ({ node, children }: NodeChildrenType) => {
  const UnTaggedChildren = documentToReactComponents(node, {
    renderMark: {
      [MARKS.CODE]: (text: any) => (
        <RichTextCodeMark>{text}</RichTextCodeMark>
      ),
      [MARKS.BOLD]: (text: any) => <BoldText>{text}</BoldText>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => children,
      [BLOCKS.LIST_ITEM]: (node, children) => children,
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <HYPERLINK node={node}>{children}</HYPERLINK>
      ),
    },
  });
  return <li className="list-item"> {UnTaggedChildren}</li>;
};

const generateOptions = (props = {}) => {
  
 
  return {
    renderMark: {
      [MARKS.CODE]: (text: any) => (
        <RichTextCodeMark>{text}</RichTextCodeMark>
      ),
      [MARKS.BOLD]: (text: any) => <BoldText>{text}</BoldText>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <RegularText node={node}>{children}</RegularText>
      ),

      [BLOCKS.TABLE]: (node: any, children: any) => {
        return <RichTextTable node={node}>{children}</RichTextTable>;
      },
      [BLOCKS.TABLE_ROW]: (node: any, children: any) => (
        <RichTextTableRow node={node}>{children}</RichTextTableRow>
      ),
      [BLOCKS.TABLE_CELL]: (node: any, children: any) => (
        <RichTextTableCell node={node}>{children}</RichTextTableCell>
      ),
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: any) => (
        <RichTextTableHeaderCell node={node}>
          {children}
        </RichTextTableHeaderCell>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node: any, children: any) => (
        <BlockEmbed node={node} items={children} props={props} />
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <OrderedList node={node}>{children}</OrderedList>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <UnorderedList node={node}>{children}</UnorderedList>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
        <ListItem node={node}>{children}</ListItem>
      ),
      // [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => (
      //   <EmbededAsset node={node} />
      // ),

      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <HYPERLINK node={node}>{children}</HYPERLINK>
      ),
      [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => (
        <AssetHYPERLINK node={node}>{children}</AssetHYPERLINK>
      ),
      // [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => (
      //   <EntryHYPERLINK node={node}>{children}</EntryHYPERLINK>
      // ),
      // [INLINES.EMBEDDED_ENTRY]: (node: any, children: any) => (
      //   <InlineEmbed node={node} items={children} />
      // ),
    },

    renderText: (text: string) => text.replace("!", "?"),
    // renderText: text =>
    //     text.split('\n').flatMap((text, i) => [i > 0 && <br />, text]),
  };
};

export default generateOptions;
