import { Typography } from "@mui/material";
import * as React from "react";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function Title({ children }: Props): JSX.Element {
  return <Typography variant="h1">{children}</Typography>;
}

export default Title;
