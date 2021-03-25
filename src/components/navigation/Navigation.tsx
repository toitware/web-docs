import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import NavTree from "./NavTree";

export type NavPage = {
  slug: string;
  title: string;
  subPages?: NavPage[];
  order?: number;
};

interface GraphType {
  allMdx: {
    nodes: {
      frontmatter: {
        order: number | null;
        path: string;
        title: string;
      };
      slug: string;
      headings: { value: string }[];
    }[];
  };
}

export function Navigation(): JSX.Element {
  const data: GraphType = useStaticQuery(graphql`
    query MyQuery {
      allMdx(sort: { fields: slug }, filter: { fileAbsolutePath: { regex: "//docs//" } }) {
        nodes {
          frontmatter {
            order
            path
            title
          }
          slug
          headings {
            value
          }
          fileAbsolutePath
        }
      }
    }
  `);

  const pages: NavPage[] = [];

  for (const node of data.allMdx.nodes) {
    const page = {
      slug: node.slug,
      title: node.frontmatter.title == "" ? node.headings[0].value : node.frontmatter.title,
      order: node.frontmatter.order ?? undefined,
    };

    const slugParts = node.slug.replace(/\/$/, "").split("/");
    const parentSubPages = getParentSubpages(pages, slugParts, node.slug);
    parentSubPages.push(page);
  }

  sortTree(pages);

  return <NavTree pages={pages} />;
}

/**
 * Returns the list of subpages for the parent page. In case this is a root
 * page, the `pages` list is returned.
 */
function getParentSubpages(pages: NavPage[], slugParts: string[], fullSlug: string): NavPage[] {
  if (slugParts.length == 1) {
    // No more parts to split
    return pages;
  } else {
    const parent = pages.find((page) => page.slug.replace(/\/$/, "").split("/").pop() == slugParts[0]);
    if (parent === undefined) {
      throw Error(`No parent found for ${fullSlug}`);
    }
    if (parent.subPages === undefined) parent.subPages = [];
    return getParentSubpages(parent.subPages, slugParts.slice(1), fullSlug);
  }
}

function sortTree(pages: NavPage[]): void {
  pages.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) {
      return a.order - b.order;
    } else if (a.order !== undefined) {
      return -1;
    } else if (b.order !== undefined) {
      return 1;
    } else {
      // Leave the sorting the way it came from GraphQl
      return 0;
    }
  });
  for (const page of pages) {
    if (page.subPages !== undefined) sortTree(page.subPages);
  }
}

export default Navigation;
