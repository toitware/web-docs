import { ThemeProvider } from "@material-ui/core";
import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";
import { ReactNode } from "react";
import { Helmet } from "react-helmet";
import { components, shorthands } from "../../mdx-components";
import { darkTheme, lightTheme } from "../../theme";
import Root from "./Root";

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

const dark = false;

export function Layout(props: LayoutProps): JSX.Element {
  const { data, children, pageContext } = props;

  const pageTitle = pageContext?.frontmatter.title;

  const title = `${pageTitle ? `${pageTitle} - ` : ""}${data?.site.siteMetadata?.title}`;

  const mdxBody = data?.mdx?.body;

  return (
    <MDXProvider components={{ ...shorthands, ...components }}>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <Helmet title={title}></Helmet>
        <Root tableOfContents={data?.mdx?.tableOfContents}>
          {!mdxBody && children}
          {mdxBody && <MDXRenderer>{mdxBody}</MDXRenderer>}
        </Root>
      </ThemeProvider>
    </MDXProvider>
  );
}

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      body
      tableOfContents
    }
  }
`;

export default Layout;
