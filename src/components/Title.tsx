import { makeStyles, Typography } from "@material-ui/core";
import { ReactNode } from "react";
import * as React from "react";

// This style is just added for reference.
const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: `2px solid ${theme.palette.text.primary}`,
  },
}));

type Props = {
  children: ReactNode;
};

export function Title({ children }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Typography className={classes.title} variant="h1">
      {children}
    </Typography>
  );
}

export default Title;
