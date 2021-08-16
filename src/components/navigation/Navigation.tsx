import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { graphql, useStaticQuery } from "gatsby";
import * as React from "react";
import { useMemo, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ToitLogo from "../../assets/images/toit-logo.inline.svg";
import { useAutoScroll } from "../../hooks/use_auto_scroll";
import { golden } from "../../theme";
import NavTree from "./NavTree";
import { sortTree } from "./sort_tree";

export type NavPage = {
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
const useStyles = makeStyles((theme) => ({
  root: {
    background: "black",
    color: "white",
    overflowY: "auto",
    overflowX: "hidden",
    margin: 0,
    padding: "3rem 1.5rem 9rem 3rem",
  },
  toitLogo: {
    marginBottom: "3rem",
  },
  link: {
    color: "white",
    fontFamily: theme.typography.fontFamily,
    display: "flex",
    alignItems: "center",
    lineHeight: "1.5rem",
    margin: "0.5rem 0",
    "& strong": {
      fontWeight: "normal",
      color: golden.toString(),
    },
  },
  separator: {
    border: "none",
    height: 1,
    background: "white",
    margin: "4.5rem 1.5rem 4.5rem 0",
  },
  backArrow: {
    marginRight: "1rem",
  },
}));

/**
 * When using this component, you are in charge of positioning it with
 * `className`.
 */
export function Navigation({ className }: { className?: string }): JSX.Element {
  const data: GraphType = useStaticQuery(graphql`
    query MyQuery {
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

  const classes = useStyles();

  const navRef = useRef<HTMLElement>(null);
  useAutoScroll(navRef);

  return (
    <nav ref={navRef} className={clsx(classes.root, className)}>
      <a href="/">
        <ToitLogo className={classes.toitLogo} />
      </a>

      <NavTree pages={pagesTree} />

      <hr className={classes.separator} />

      <a className={classes.link} href="https://toit.io">
        <FiArrowLeft className={classes.backArrow} />{" "}
        <span>
          Go to <strong>toit.io</strong>
        </span>
      </a>

      <a className={classes.link} href="https://pkg.toit.io/">
        <FiArrowLeft className={classes.backArrow} />{" "}
        <span>
          Go to <strong>pkg.toit.io</strong>
        </span>
      </a>
    </nav>
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

export default Navigation;
