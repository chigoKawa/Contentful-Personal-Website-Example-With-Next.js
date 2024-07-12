import React from "react";
import { IPerson, ICodeSnippet } from "@/lib/contentful/interfaces/topics";

import CodeSnippet from "@/components/atoms/code-snippet";


const Person = ({ firstName, lastName }: any) => {
  return (
    <span className="text-underline  text-accent-500 ">
      {firstName} {lastName}
    </span>
  );
};

const CodeSnippetWrapper = (entry: ICodeSnippet) => {
  const code = entry?.fields?.codeBlock;
  const language = entry?.fields?.language;



  return (
   
    <CodeSnippet code={code} language={language} />
  );
};

export default CodeSnippetWrapper;
