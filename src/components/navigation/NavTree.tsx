import { makeStyles } from "@material-ui/core";
import { globalHistory } from "@reach/router";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { NavPage } from "./Navigation";

// This style is just added for reference.
const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  level0: {},
  level1: {
    marginBottom: theme.spacing(2),
  },
  level2: {
    paddingLeft: theme.spacing(2),
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    fontFamily: theme.typography.fontFamily,
    display: "block",
    lineHeight: "1.75rem",
    opacity: 0.7,
  },
  groupTitle: {
    fontWeight: "bold",
    opacity: 1,
    marginTop: theme.spacing(2),
  },
  subGroupTitle: {
    opacity: 1,
    textTransform: "uppercase",
    marginTop: "0.5em",
    fontSize: "0.8em",
  },
  activeTitle: {
    color: theme.palette.getContrastText(theme.palette.background.default),
  },
  active: {
    color: theme.palette.primary.main,
    opacity: 1,
  },
}));

type Props = {
  pages: NavPage[];
  level?: number;
};

function NavTree({ pages, level = 0 }: Props): JSX.Element {
  const classes = useStyles();

  const currentPath = globalHistory.location.pathname;

  return (
    <ul
      className={clsx(classes.list, {
        [classes.level0]: level === 0,
        [classes.level1]: level === 1,
        [classes.level2]: level === 2,
      })}
    >
      {pages.map((page) => {
        let to = `/${page.slug}`;
        if (!to.endsWith("/")) to += "/";

        if (page.subPages === undefined || page.subPages.length === 0) {
          return (
            <li key={page.slug}>
              <Link to={to} className={classes.link} activeClassName={classes.active}>
                {page.title}
              </Link>
              {page.subPages !== undefined && <NavTree pages={page.subPages} level={level + 1} />}
            </li>
          );
        } else {
          return (
            <li key={page.slug}>
              <span
                className={clsx(classes.link, {
                  [classes.groupTitle]: level === 0,
                  [classes.subGroupTitle]: level > 0,
                  [classes.activeTitle]: currentPath.startsWith(to),
                })}
              >
                {page.title}
              </span>
              {page.subPages !== undefined && (
                <NavTree
                  pages={[{ ...page, title: "Overview", subPages: undefined }, ...page.subPages]}
                  level={level + 1}
                />
              )}
            </li>
          );
        }
      })}
    </ul>
  );
}

export default NavTree;
