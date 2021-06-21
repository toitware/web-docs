import { makeStyles, ThemeProvider } from "@material-ui/core";
import CodeBlock from "@toitware/code-block";
import clsx from "clsx";
import Color from "color";
import * as React from "react";
import { ReactNode, useRef, useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { darkTheme } from "../theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    position: "relative",
    boxShadow: `0 0 10px ${Color(theme.palette.text.primary).alpha(0.1).toString()}`,
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
    bottom: 0,
    right: 0,
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

  async function copyCode() {
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

      <a href="#" onClick={copyCode} className={classes.copyIcon}>
        <FiCopy />
      </a>
      <div ref={checkRef} className={clsx(classes.copyCheckmark, { [classes.copyCheckmarkVisible]: copied })}>
        <FiCheck />
      </div>
    </div>
  );
}

export default Code;
