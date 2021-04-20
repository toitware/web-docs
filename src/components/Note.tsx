import { makeStyles, Typography } from "@material-ui/core";
import { ReactNode } from "react";
import Color from "color";
import * as React from "react";

const useStyles = makeStyles((theme) => ({
  note: {
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.4).string()}`,
    padding: "1rem",
    borderRadius: "3px",
  },
  title: {
    fontWeight: "bold",
  },
}));

type Props = {
  children: ReactNode;
  title: string;
  type?: "info" | "warning";
};

export function Note({ children, title, type = "info" }: Props): JSX.Element {
  const classes = useStyles();
  // Placeholder emoji for now.
  const emojis = {
    info: "ℹ️",
    warning: "⚠️",
  };
  return (
    <Typography className={classes.note} component="div">
      <div className={classes.title}>
        {emojis[type]} {title}
      </div>
      {children}
    </Typography>
  );
}

export default Note;
