import SyntaxHighlighter from "react-syntax-highlighter";

// import { obsidian } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { obsidian } from "react-syntax-highlighter/dist/cjs/styles/hljs";

type Props = {
  children: any;
};

const RichTextCodeMark = ({ children }: Props) => {
  return (
    <SyntaxHighlighter
      customStyle={{
        padding: "10px 10px",
        borderRadius: "20px",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      }}
      language="javascript"
      style={obsidian}
      showLineNumbers={true}
      wrapLines={true}
      // wrapLongLines={true}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default RichTextCodeMark;
