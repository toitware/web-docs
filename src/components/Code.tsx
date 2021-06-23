import { makeStyles, ThemeProvider } from "@material-ui/core";
import CodeBlock from "@toitware/code-block";
import clsx from "clsx";
import * as React from "react";
import { ReactNode, useRef, useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";
import { darkTheme } from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    position: "relative",
    margin: "1.5rem 0",
    "& .CodeMirror-sizer": {
      // I don't know why this is necessary, but otherwise the containers
      // cant fully scroll to the right.
      paddingRight: "50px !important",
    },
  },
  code: {
    fontSize: "0.875em",
  },
  copyIcon: {
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
  },
  copyCheckmark: {
    position: "absolute",
    bottom: "0.25rem",
    right: "-1rem",
    width: "1rem !important",
    height: "1rem !important",
    color: "green",
    transition: "all 1s linear",
    opacity: 0,
  },
  copyCheckmarkVisible: {
    opacity: 1,
    transition: "none",
  },
}));

type Props = {
  children: ReactNode;
  className?: string;
};
export function Code({ className, children }: Props): JSX.Element {
  const classes = useStyles();
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
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <CodeBlock mode={mode} className={classes.code} code={sanitizedCode} />
      </ThemeProvider>

      <a onClick={copyCode} className={classes.copyIcon}>
        <FiCopy />
      </a>
      <div ref={checkRef} className={clsx(classes.copyCheckmark, { [classes.copyCheckmarkVisible]: copied })}>
        <FiCheck />
      </div>
    </div>
  );
}

export default Code;
