import { makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@mui/material/styles";
import CookieConsent from "@toitware/cookie-consent";
import Color from "color";
import * as React from "react";
import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation/Navigation";
import useDarkMode from "../hooks/use_dark_mode";
import { darkTheme, lightTheme } from "../theme";
import Header from "./Header";
import { TableOfContents } from "./TableOfContents";

const useStyles = makeStyles((theme) => ({
  "@global": {
    html: {
      scrollPaddingTop: "6rem",
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      lineHeight: "1.5",
      color: theme.palette.text.primary,
      fontSize: theme.typography.body1.fontSize,
      fontFamily: theme.typography.body1.fontFamily,
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
    minHeight: "100vh",
    paddingLeft: 0,
    [theme.breakpoints.up("md")]: {
      paddingLeft: "18.75rem",
    },
  },
  nav: {
    position: "fixed",
    width: "18.75rem",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: 1000,

    [theme.breakpoints.down("sm")]: {
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
  content: {
    display: "flex",
    paddingTop: "6rem",
    justifyContent: "center",
  },
}));

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
  data?: MdxGraphType;
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
  let segmentAPIKey = process.env.GATSBY_SEGMENT_WRITE_KEY;

  if (typeof document !== `undefined`) {
    // Check if the meta segment-key is set.
    const segmentKeyDOM = document.querySelector('meta[name="segment-key"]');
    if (segmentKeyDOM) {
      segmentAPIKey = segmentKeyDOM.getAttribute("content") || segmentAPIKey;
    }
  }
  useEffect(() => {
    setupCrispChat();
  }, []);

  const setupCrispChat = () => {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "d7358065-35d6-43ee-bcd9-608d223d7aab";
    const s = document.createElement("script");
    s.src = "https://client.crisp.chat/l.js";
    s.async = true;
    document.getElementsByTagName("head")[0].appendChild(s);
  };

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <CookieConsent show={true} segmentKey={segmentAPIKey || "no-key"} changeConsent={false} />
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
      <Navigation className={classes.nav} />
      <div className={classes.content}>{children}</div>
    </div>
  );
};

export default Layout;
