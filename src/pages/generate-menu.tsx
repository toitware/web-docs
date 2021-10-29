import { graphql, useStaticQuery } from "gatsby";
import React, { useMemo } from "react";

type NavPage = {
  slug: string;
  title: string;
  subPages: NavPage[];
  order?: number;
  showInMenu: boolean;
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
export function SitemapGeneratorPage(): JSX.Element {
  const data: GraphType = useStaticQuery(graphql`
    query MySitemapQuery {
      allMdx(
        sort: { fields: slug }
        filter: { fileAbsolutePath: { regex: "//docs//" }, frontmatter: { hide: { ne: true } } }
      ) {
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

  const pagesTree = useMemo(() => {
    const pagesTree: NavPage[] = [{ slug: "", title: "Home", order: -100, showInMenu: true, subPages: [] }];

    for (const node of data.allMdx.nodes) {
      const page = {
        slug: node.slug.replace(/\/$/, ""),
        title: node.frontmatter.title == "" ? node.headings[0].value : node.frontmatter.title,
        order: node.frontmatter.order ?? undefined,
        showInMenu: node.headings.length > 0,
        subPages: [],
      };

      const slugParts = page.slug.split("/");
      const parentSubPages = getParentSubpages(pagesTree, slugParts, node.slug);
      parentSubPages.push(page);
    }

    addOverviewItems(pagesTree);
    sortTree(pagesTree);

    return pagesTree;
  }, [data]);

  type Sitemap = {
    name: string;
    path: string;
    children?: Sitemap[];
  };
  const mapToSitemap = (tree: NavPage[]): Sitemap[] => {
    return tree.map((page) => {
      const sitemap: Sitemap = {
        name: page.title,
        path: `/${page.slug}`,
      };
      if (page.subPages.length > 0) {
        sitemap.children = mapToSitemap(page.subPages);
      }
      return sitemap;
    });
  };
  const sitemap = mapToSitemap(pagesTree);

  return (
    <div>
      <p>Take this content and post to: https://json2yaml.com</p>
      <pre>{JSON.stringify(sitemap, null, "  ")}</pre>
    </div>
  );
}

/**
 * Modifies pages and adds "Overview" entries to menu groups where there should
 * be one.
 */
function addOverviewItems(pages: NavPage[], level = 0) {
  for (const page of pages) {
    if (page.subPages.length > 0 && page.showInMenu) {
      page.subPages.unshift({ ...page, title: "Overview", subPages: [], order: -100 });
    }
    addOverviewItems(page.subPages, level + 1);
  }
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
    const parent = pages.find((page) => page.slug.split("/").pop() == slugParts[0]);
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
      return a.title.localeCompare(b.title, undefined, {});
    }
  });
  for (const page of pages) {
    if (page.subPages !== undefined) sortTree(page.subPages);
  }
}

export default SitemapGeneratorPage;
