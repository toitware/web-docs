import { makeStyles } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";

const useStyles = makeStyles((theme) => ({
  boxes: {
    position: "relative",
    margin: "3rem 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
    gridGap: "1.5rem",
  },
  box: {
    backgroundColor: Color(theme.palette.primary.main).alpha(0.05).string(),
    border: `1px solid ${Color(theme.palette.text.primary).alpha(0.05).string()}`,
    borderRadius: "5px",
    padding: "1.5rem",
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
