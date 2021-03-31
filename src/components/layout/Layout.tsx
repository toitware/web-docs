import { ThemeProvider } from "@material-ui/core";
import { MDXProvider } from "@mdx-js/react";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { components, shorthands } from "../../mdx-components";
import { darkTheme, lightTheme } from "../../theme";
import Root from "./Root";

interface GraphType {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

interface LayoutProps {
  children: ReactNode;
  pageContext?: {
    frontmatter: {
      title?: string;
      path?: string;
    };
  };
}

const dark = false;

export function Layout(props: LayoutProps): JSX.Element {
  const data: GraphType = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const pageTitle = props.pageContext?.frontmatter.title;

  const title = `${pageTitle ? `${pageTitle} - ` : ""}${data.site.siteMetadata?.title}`;

  return (
    <MDXProvider components={{ ...shorthands, ...components }}>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <Helmet title={title}></Helmet>
        <Root>{props.children}</Root>
      </ThemeProvider>
    </MDXProvider>
  );
}

export default Layout;
