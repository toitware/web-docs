import { makeStyles, ThemeProvider } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation/Navigation";
import useDarkMode from "../hooks/use_dark_mode";
import { darkTheme, lightTheme } from "../theme";
import Header from "./Header";

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
}));

export type TableOfContents = {
  items: TableOfContentsItem[];
};

export type TableOfContentsItem = {
  url: string;
  title: string;
  items?: TableOfContentsItem[];
};

interface MdxGraphType {
  mdx: { body: string; tableOfContents: TableOfContents };
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

interface LayoutProps {
  children: ReactNode;
  data: MdxGraphType;
  pageContext?: {
    frontmatter: {
      title?: string;
      path?: string;
    };
  };
}

// This layout is used by the "gatsby-plugin-layout" plugin and wraps all pages.
// Using this plugin ensures that the menu doesn't jump around when an item is
// clicked since only the content is changed.
export function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  const title = "Toit Documentation";

  const dark = useDarkMode();

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Helmet title={title}></Helmet>
      <Root>{children}</Root>
    </ThemeProvider>
  );
}

const Root: React.FC = ({ children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.main}>
        <nav className={classes.nav}>
          <Navigation />
        </nav>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
