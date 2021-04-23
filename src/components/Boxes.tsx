import { makeStyles } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  boxes: {
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1.5rem",
    margin: "3rem 0",
  },
  box: {
    backgroundColor: Color(theme.palette.primary.main).alpha(0.05).string(),
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.05).string()}`,
    borderRadius: "5px",
    padding: "1.5rem",
    flexBasis: "calc(50% - 1.5rem)",
    minWidth: "12rem",
    flex: 1,
    "& p:last-child": {
      marginBottom: 0,
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.3rem",
  },
}));

type BoxesProps = {
  children: ReactNode;
};

export function Boxes({ children }: BoxesProps): JSX.Element {
  const classes = useStyles();
  return <div className={classes.boxes}>{children}</div>;
}

type BoxProps = {
  title?: string;
  children: ReactNode;
};

export function Box({ title, children }: BoxProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      {title && <h1 className={classes.title}>{title}</h1>}
      {children}
    </div>
  );
}
