import { makeStyles, Typography } from "@material-ui/core";
import { ReactNode } from "react";
import Color from "color";
import * as React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  note: {
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
    padding: "1rem 1rem 0 1rem",
    borderRadius: "4px",
    borderLeft: `3px solid ${theme.palette.text.primary}`,
    margin: "1.5rem 0",
  },
  noteInfo: {
    borderLeftColor: theme.palette.primary.main,
  },
  noteWarning: {
    borderLeftColor: theme.palette.warning.main,
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
    <Typography
      className={clsx(classes.note, { [classes.noteWarning]: type == "warning", [classes.noteInfo]: type == "info" })}
      component="div"
    >
      <div className={classes.title}>
        {emojis[type]} {title}
      </div>
      {children}
    </Typography>
  );
}

export default Note;
