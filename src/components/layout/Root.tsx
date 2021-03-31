import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import Footer from "./Footer";
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
  },
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  main: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
  },
  nav: {
    width: "20rem",
    flexShrink: 0,
  },
  content: {
    flex: 1,
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
        <div className={classes.content}>{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Root;
