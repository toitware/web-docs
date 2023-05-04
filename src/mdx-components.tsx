/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { MDXProviderComponentsProp } from "@mdx-js/react";
import { Typography } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { CodeBlock } from "@toitware/code-block";
import React from "react";
import { Box, Boxes } from "./components/Boxes";
import Code from "./components/Code";
import { DocsLink } from "./components/DocsLink";
import Expandable from "./components/Expandable";
import Note from "./components/Note";
import { Table, TableBody, TableHead } from "./components/Table";
import { Tabs } from "./components/Tabs";
import Title from "./components/Title";
import ZoomableImage from "./components/ZoomableImage";

const P = (props: any) => <Typography paragraph {...props} />;
const H1 = (props: any) => <Typography variant="h1" {...props} />;
const H2 = (props: any) => <Typography variant="h2" {...props} />;
const H3 = (props: any) => <Typography variant="h3" {...props} />;
const H4 = (props: any) => <Typography variant="h4" {...props} />;
const H5 = (props: any) => <Typography variant="h5" {...props} />;
const H6 = (props: any) => <Typography variant="h6" {...props} />;

const Pre = (props: any) => <>{props.children}</>;

const NonZoomableImage = (props: any) => (
  <>
    <img {...props} />
  </>
);

export const components: MDXProviderComponentsProp = {
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: DocsLink,
  code: Code,
  pre: Pre,
  table: Table,
  td: TableBody,
  tr: TableRow,
  th: TableHead,
  img: ZoomableImage,
};

/**
 * List of components that can be used in `.mdx` files.
 */
export const shorthands = {
  Title,
  CodeBlock,
  Note,
  Tabs,
  Boxes,
  Box,
  Expandable,
  NonZoomableImage,
};
