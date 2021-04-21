/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { CodeBlock } from "@toitware/code-block";
import { Link, makeStyles, Typography } from "@material-ui/core";
import { MDXProviderComponentsProp } from "@mdx-js/react";
import React from "react";
import Title from "./components/Title";
import Note from "./components/Note";
import { Tabs } from "./components/Tabs";

const P = (props: any) => <Typography paragraph {...props} />;
const H1 = (props: any) => <Typography variant="h1" {...props} />;
const H2 = (props: any) => <Typography variant="h2" {...props} />;
const H3 = (props: any) => <Typography variant="h3" {...props} />;
const H4 = (props: any) => <Typography variant="h4" {...props} />;
const H5 = (props: any) => <Typography variant="h5" {...props} />;
const H6 = (props: any) => <Typography variant="h6" {...props} />;
const A = (props: any) => <Link variant="body1" color="textSecondary" {...props} />;

const Pre = (props: any) => <>{props.children}</>;

const useStyles = makeStyles(() => ({
  code: {
    fontSize: "0.875em",
  },
}));

const Code = (props: { children: React.ReactNode; className?: string }) => {
  const classes = useStyles();
  let mode: string | undefined;
  if (props.className && props.className.startsWith("language-")) {
    mode = props.className.replace("language-", "");
  }
  return <CodeBlock mode={mode} className={classes.code} code={props.children?.toString() ?? ""} />;
};

export const components: MDXProviderComponentsProp = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: A,
  code: Code,
  pre: Pre,
};

/**
 * List of components that can be used in `.mdx` files.
 */
export const shorthands = {
  Title,
  CodeBlock,
  Note,
  Tabs,
};
