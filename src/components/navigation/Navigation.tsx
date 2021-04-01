import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import NavTree from "./NavTree";
import { sortTree } from "./sort_tree";

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

  const pagesTree: NavPage[] = [{ slug: "", title: "Home", order: -100 }];

  for (const node of data.allMdx.nodes) {
    const page = {
      slug: node.slug,
      title: node.frontmatter.title == "" ? node.headings[0].value : node.frontmatter.title,
      order: node.frontmatter.order ?? undefined,
    };

    const slugParts = node.slug.replace(/\/$/, "").split("/");
    const parentSubPages = getParentSubpages(pagesTree, slugParts, node.slug);
    parentSubPages.push(page);
  }

  sortTree(pagesTree);

  return <NavTree pages={pagesTree} />;
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

export default Navigation;
