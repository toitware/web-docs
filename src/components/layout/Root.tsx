import { Hidden, makeStyles } from "@material-ui/core";
import { TableOfContents } from "./Layout";
import * as React from "react";
import { ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import Header from "./Header";
import { TableOfContentsNav } from "./TableOfContents";

const useStyles = makeStyles((theme) => ({
  "@global": {
    html: {
      // Make sure the scrollbar is never visible, since the content div is
      // scrollable by itself.
      overflowY: "hidden",
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
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  nav: {
    width: "15rem",
    flexShrink: 0,
    overflowY: "auto",
    overflowX: "hidden",
    padding: theme.spacing(4),
    paddingRight: 0,
  },
  main: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 0,
    overflowY: "hidden",
  },
  contentContainer: {
    flex: 1,
    padding: 0,
    overflowY: "auto",
    overflowX: "hidden",
  },
  content: {
    display: "flex",
    justifyContent: "center",
  },
  contentBody: {
    width: "46rem",
    padding: theme.spacing(6),

    // Setting the color so things like list bullets are colored properly
    color: theme.palette.text.primary,

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
              <Hidden mdDown>
                <TableOfContentsNav table={tableOfContents} />
              </Hidden>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Root;
