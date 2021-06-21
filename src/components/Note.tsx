import { makeStyles, Typography } from "@material-ui/core";
import { ReactNode } from "react";
import Color from "color";
import * as React from "react";
import clsx from "clsx";
import { IoInformationCircle, IoWarning } from "react-icons/io5";

const useStyles = makeStyles((theme) => ({
  note: {
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
    padding: "0 1.5rem 0 1.5rem",
    borderRadius: "4px",
    borderLeft: `3px solid ${theme.palette.text.primary}`,
    margin: "3rem 0",
  },
  noteInfo: {
    borderLeftColor: theme.palette.primary.main,
  },
  noteWarning: {
    borderLeftColor: theme.palette.warning.main,
  },
  title: {
    marginTop: "1rem",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  body: {
    display: "flex",
    alignItems: "center",
  },
  bodyContent: {},
  icon: {
    width: "1.5rem",
    height: "1.5rem",
    marginRight: "1rem",
  },
  infoIcon: {
    color: theme.palette.primary.main,
  },
  warningIcon: {
    color: theme.palette.warning.main,
  },
}));

type Props = {
  children: ReactNode;
  title: string;
  type?: "info" | "warning";
};

export function Note({ children, title, type = "info" }: Props): JSX.Element {
  const classes = useStyles();
  return (
    <Typography
      className={clsx(classes.note, { [classes.noteWarning]: type == "warning", [classes.noteInfo]: type == "info" })}
      component="div"
    >
      {title && (
        <div className={classes.title}>
          {type == "info" && <IoInformationCircle className={clsx(classes.icon, classes.infoIcon)} />}
          {type == "warning" && <IoWarning className={clsx(classes.icon, classes.warningIcon)} />}
          {title}
        </div>
      )}
      <div className={classes.body}>
        {!title && type == "info" && <IoInformationCircle className={clsx(classes.icon, classes.infoIcon)} />}
        {!title && type == "warning" && <IoWarning className={clsx(classes.icon, classes.warningIcon)} />}
        <div className={classes.bodyContent}>{children}</div>
      </div>
    </Typography>
  );
}

export default Note;
