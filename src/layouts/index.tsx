import { styled, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Color from "color";
import * as React from "react";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import Navigation from "../components/navigation/Navigation";
import useDarkMode from "../hooks/use_dark_mode";
import { darkTheme, lightTheme } from "../theme";
import Header from "./Header";
import { TableOfContents } from "./TableOfContents";

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

  const title = "Toit documentation";

  const dark = useDarkMode();

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <Helmet title={title}></Helmet>
      <Root>{children}</Root>
    </ThemeProvider>
  );
}

const RootWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  paddingLeft: 0,
  [theme.breakpoints.up("md")]: {
    paddingLeft: "18.75rem",
  },
}));

const Nav = styled(Navigation)(({ theme }) => ({
  position: "fixed",
  width: "18.75rem",
  top: "0",
  bottom: "0",
  left: "0",
  zIndex: 1000,

  [theme.breakpoints.down("md")]: {
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
}));

const Content = styled("div")({
  display: "flex",
  paddingTop: "6rem",
  justifyContent: "center",
});

const Root: React.FC = ({ children }) => {
  const theme = useTheme();
  return (
    <RootWrapper>
      <GlobalStyles
        styles={{
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
        }}
      />
      <Header />
      <Nav />
      <Content>{children}</Content>
    </RootWrapper>
  );
};

export default Layout;
