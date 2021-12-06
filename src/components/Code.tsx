import { styled } from "@mui/material";
import CodeBlock from "@toitware/code-block";
import * as React from "react";
import { ReactNode, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

const Root = styled("div")({
  display: "block",
  position: "relative",
  margin: "1.5rem 0",
  "& .CodeMirror-sizer": {
    // I don't know why this is necessary, but otherwise the containers
    // cant fully scroll to the right.
    paddingRight: "50px !important",
  },
});

const CodeBlockStyled = styled(CodeBlock)({
  fontSize: "0.875em",
});

const CopyIcon = styled("a")(({ theme }) => ({
  display: "block",
  position: "absolute",
  width: "1.5rem",
  height: "1.5rem",
  padding: "0.25rem",
  cursor: "pointer",
  top: 2,
  right: 2,
  color: theme.palette.text.primary,
  borderRadius: "3rem",
  whiteSpace: "nowrap",
  zIndex: 10,
  "&:hover": {
    color: "white",
  },
  "& svg": {
    display: "block",
    height: "100%",
    width: "100%",
  },
}));

const Checkmark = styled("div", {
  shouldForwardProp: (prop) => prop !== "visible",
})<{ visible?: boolean }>(({ visible }) => ({
  position: "absolute",
  bottom: "0.25rem",
  right: "-1rem",
  width: "1rem !important",
  height: "1rem !important",
  color: "green",
  transition: visible ? "none" : "all 1s linear",
  opacity: visible ? 1 : 0,
}));

type Props = {
  children: ReactNode;
  className?: string;
};
export function Code({ className, children }: Props): JSX.Element {
  const checkRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  let mode: string | undefined;
  if (className && className.startsWith("language-")) {
    mode = className.replace("language-", "");
  }

  async function copyCode(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    if (children) {
      await navigator.clipboard.writeText(children.toString());
      setCopied(true);
    }
  }

  const code = children?.toString() ?? "";

  const sanitizedCode = code.replace(/\n$/, "");

  return (
    <Root>
      <CodeBlockStyled mode={mode} code={sanitizedCode} />

      <CopyIcon onClick={copyCode}>
        <FiCopy />
      </CopyIcon>
      <Checkmark ref={checkRef} visible={copied}>
        <FiCheck />
      </Checkmark>
    </Root>
  );
}

export default Code;
