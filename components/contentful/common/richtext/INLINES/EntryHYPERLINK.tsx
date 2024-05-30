/**
 * only pages are linked here.
 * Pages have slugs some have categories
 */

import React from "react";
import Link from "next/link";


type Props = {
  children: any;
  node: any;
};
const EntryHYPERLINK = ({ node, children }: Props) => {
  const entry = node?.data?.target;

  const contentType = node?.data?.target?.sys?.contentType?.sys?.id;

  // const PATH = extractPagePath(entry);
  // const href = `${contentType === "blogPostPage" ? "/blog/" : "/"}${PATH}`;

  return <>EntryHYPERLINK :NOT IMPLEMENTED</>
  if (!entry) {
    return <></>;
  }
  // return (
  //   <Link target="_blank" href={href}>
  //     <span className="underline text-blue-500">
  //       {children.map((line: any, lx: number) => {
  //         if (!line) {
  //           return <br key={lx} />;
  //         } else {
  //           return line;
  //         }
  //       })}
  //     </span>
  //   </Link>
  // );
};

export default EntryHYPERLINK;
