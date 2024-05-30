import React from "react";

type Props = {
  children: any;
  node: any;
};

const RegularText = ({ node, children }: Props) => {

  // if (
  //   node?.content?.length === 1 &&
  //   node?.content?.[0]?.marks?.find((e: any) => e?.type === `code`)
  // ) {
  //   return (
  //     <pre className="border-2x ">
  //       <code className="hljsx">
  //         {children.map((line: any, lx: number) => {
  //           if (!line) {
  //             return <br key={lx} />;
  //           } else {
  //             return line;
  //           }
  //         })}
  //       </code>
  //     </pre>
  //   );
  // }
  if (
    node.content.length === 1 &&
    node.content[0].marks.find((x: any) => x?.type === "code")
  ) {
    return <div className="">{children}</div>;
  }


  return (
    <p className="leading-loose px-4  ">
      {/* {JSON.stringify(node)} */}
      {children.map((line: any, lx: number) => {
        if (!line) {
          return <br key={lx} />;
        } else {
          return line;
        }
      })}
    </p>
  );
};

export default RegularText;
