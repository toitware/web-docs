import { makeStyles } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import Header from "./Header";
import { TableOfContents } from "./Layout";
import { TableOfContentsNav } from "./TableOfContents";

const useStyles = makeStyles((theme) => ({
  "@global": {
    html: {
      [theme.breakpoints.up("sm")]: {
        // Make sure the scrollbar is never visible, since the content div is
        // scrollable by itself.
        overflowY: "hidden",
      },
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
    },
    a: {
      textDecoration: `none`,
    },
    "*": {
      boxSizing: "border-box",
    },
  },
  root: {
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up("sm")]: {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
    },
  },
  nav: {
    width: "15rem",
    flexShrink: 0,
    overflowY: "auto",
    overflowX: "hidden",
    margin: theme.spacing(4),
    marginRight: 0,
    paddingRight: 0,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },
    "&::-webkit-scrollbar-thumb": {
      background: Color(theme.palette.text.primary).alpha(0.2).string(),
      borderRadius: "1.5rem",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
  },
  main: {
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      flexDirection: "row",
      height: "100%",
      overflowY: "hidden",
    },
  },
  contentContainer: {
    flex: 1,
    padding: 0,
    [theme.breakpoints.up("sm")]: {
      overflowY: "auto",
      overflowX: "hidden",
    },
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  contentBody: {
    width: "46rem",
    maxWidth: "100%",
    padding: theme.spacing(4),

    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(6),
    },

    // Setting the basic typography so things like list bullets are colored properly
    color: theme.palette.text.primary,
    fontSize: theme.typography.body1.fontSize,
    fontFamily: theme.typography.body1.fontFamily,

    "& p": {
      marginTop: "0.75rem",
    },
    "& h1": {
      margin: "1.5rem 0",
      "&:first-child": {
        marginTop: 0,
      },
    },
    "& h2": {
      margin: "1.5rem 0",
    },
    "& .table-of-contents-icon": {
      position: "absolute",
      left: "-1.5rem",
      opacity: 0,
    },
    "& h1:hover .table-of-contents-icon, & h2:hover .table-of-contents-icon": {
      opacity: 1,
    },
    "& img": {
      maxWidth: "100%",
    },
  },
  tableOfContents: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

type Props = {
  children: ReactNode;
  tableOfContents?: TableOfContents;
};

/**
 * The actual content of the layout, separated into its own component so it has
 * access to the theme.
 */
export function Root({ children, tableOfContents }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>
        <nav className={classes.nav}>
          <Navigation />
        </nav>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div className={classes.contentBody}>{children}</div>
            {tableOfContents?.items && (
              <TableOfContentsNav className={classes.tableOfContents} table={tableOfContents} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Root;
