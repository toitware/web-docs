import { makeStyles } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";
import { DocsLink } from "./DocsLink";

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
    alignItems: "stretch",
    border: `1px solid ${Color(theme.palette.text.primary).string()}`,
    borderRadius: "5px",
    padding: "1.5rem",
    "& p:last-child": {
      marginBottom: 0,
    },
    // Because the a element takes precedent over this class, we need
    // to use important here. Refactoring this would make it unnecessarily
    // complicated.
    textDecoration: "none !important",
    color: `${Color(theme.palette.text.primary).string()} !important`,
    transition: "background 200ms ease",
    "&:hover": {
      background: `${Color(theme.palette.primary.main).alpha(0.1).string()}`,
    },
  },
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    // We center all content of this wrapper vertically, but because the actual
    // .content has `flex: 1`, it will push the title and effectively "top
    // align" everything **if it exists**.
    //
    // This way, the title is always vertically centered, unless there is
    // content text, at which point it will all be top aligned.
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.3rem",
    margin: "0 0 0 0 !important",
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
  image: {
    maxWidth: "3.125rem",
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
  to: string;
  children: ReactNode;
  imageUrl?: string;
};

export function Box({ title, to, imageUrl, children }: BoxProps): JSX.Element {
  const classes = useStyles();
  return (
    <DocsLink href={to} className={classes.box}>
      <div className={classes.wrapper}>
        {title && <h1 className={classes.title}>{title}</h1>}
        {children && <div className={classes.content}>{children}</div>}
      </div>
      {imageUrl && (
        <div className={classes.image}>
          <img src={imageUrl} alt="" />
        </div>
      )}
    </DocsLink>
  );
}
