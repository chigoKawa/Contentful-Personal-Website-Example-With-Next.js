import React from "react";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { obsidian } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface IProps {
  code: string;
  language: string;
}

const CodeSnippet: React.FC<IProps> = ({ code, language }) => {
  return (
    <div className="w-fullx mx-auto overflow-autox w-60 md:w-full ">
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          // wordBreak: "break-all",
          whiteSpace: "pre-wrap",
          padding: "5px 5px",
          borderRadius: "20px",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        }}
        language={language}
        style={obsidian}
        showLineNumbers={true}
        wrapLines={true}
        // wrapLongLines={true}
        // lineProps={{className: ''}}
     
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
