import { makeStyles } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  "@global": {
    html: {
      // Make sure the scrollbar is always visible (on the devices that don't
      // have a floating scrollbar), so the menu doesn't jump around when larger
      // sections cause the scrollbar to appear.
      overflowY: "scroll",
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
    borderRight: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
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
    height: "100%",
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
  },
}));

type Props = {
  children: ReactNode;
};

/**
 * The actual content of the layout, separated into its own component so it has
 * access to the theme.
 */
export function Root({ children }: Props): JSX.Element {
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
          </div>
        </div>
      </main>
    </div>
  );
}

export default Root;
