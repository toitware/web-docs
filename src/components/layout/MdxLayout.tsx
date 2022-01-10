import { MDXProvider } from "@mdx-js/react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import * as React from "react";
import { ReactNode } from "react";
import Body from "../../layouts/Body";
import TableOfContentsNav from "../../layouts/TableOfContents";
import { components, shorthands } from "../../mdx-components";

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

// The actual layout is in /src/layouts/ and the content is wrapped by the
// "gatsby-plugin-layout" plugin.
//
// This is only the mdx component of that.
export function MdxLayout(props: LayoutProps): JSX.Element {
  const { data, children } = props;

  // TODO: https://github.com/toitware/web-docs/issues/50#issuecomment-827398248
  // const { data, children, pageContext } = props;
  // const pageTitle = pageContext?.frontmatter.title;
  // const title = `${pageTitle ? `${pageTitle} - ` : ""}${data?.site.siteMetadata?.title}`;

  const mdxBody = data?.mdx?.body;

  const tableOfContents = data?.mdx?.tableOfContents;

  return (
    <MDXProvider components={{ ...shorthands, ...components }}>
      <Body>
        {!mdxBody && children}
        {mdxBody && <MDXRenderer>{mdxBody}</MDXRenderer>}
      </Body>
      {tableOfContents?.items && <TableOfContentsNav table={tableOfContents} />}
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

export default MdxLayout;
