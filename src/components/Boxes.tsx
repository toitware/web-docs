import { makeStyles } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";
import { DocsLink } from "./DocsLink";
import { FiArrowRight } from "react-icons/fi";

const useStyles = makeStyles((theme) => ({
  boxes: {
    position: "relative",
    margin: "3rem 0",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(14rem, 1fr))",
    gridGap: "1.5rem",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${Color(theme.palette.text.primary).string()}`,
    borderRadius: "5px",
    padding: "1.5rem",
    "& p:last-child": {
      marginBottom: 0,
    },
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    margin: "0 0 0.5rem 0 !important",
  },
  content: {
    flex: 1,
    fontSize: "0.875rem",
    "& p": {
      fontSize: "0.875rem",
    },
  },
  link: {
    display: "flex",
    fontSize: "1.125rem",
    alignItems: "center",
    marginTop: "3rem",
    "& svg": {
      marginLeft: "1rem",
    },
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
  to?: string;
  children: ReactNode;
};

export function Box({ title, to, children }: BoxProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.box}>
      {title && <h1 className={classes.title}>{title}</h1>}
      <div className={classes.content}>{children}</div>
      {to && (
        <DocsLink className={classes.link} href={to}>
          Learn more <FiArrowRight />
        </DocsLink>
      )}
    </div>
  );
}
