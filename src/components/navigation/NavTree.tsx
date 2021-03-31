import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { Fragment } from "react";
import { FiChevronDown } from "react-icons/fi";
import { secondaryRed } from "../../theme";
import { NavPage } from "./Navigation";

// This style is just added for reference.
const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    padding: 0,
    paddingLeft: theme.spacing(2),
  },
  level0: {
    paddingLeft: theme.spacing(0),
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    fontFamily: theme.typography.fontFamily,
    display: "block",
    lineHeight: "1.75rem",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    opacity: 0.7,
  },
  groupTitle: {
    fontWeight: "bold",
    opacity: 1,
  },
  subGroupTitle: {
    opacity: 1,
    textTransform: "uppercase",
    marginTop: "0.5em",
  },
  active: {
    color: secondaryRed.string(),
    opacity: 1,
    // background: secondaryRed.lightness(98).string(),
  },
}));

type Props = {
  pages: NavPage[];
  level?: number;
};

function NavTree({ pages, level = 0 }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <ul
      className={clsx(classes.list, {
        [classes.level0]: level === 0,
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
            <Fragment key={page.slug}>
              <li>
                <span
                  className={clsx(classes.link, {
                    [classes.groupTitle]: level === 0,
                    [classes.subGroupTitle]: level > 0,
                  })}
                >
                  {page.title} {level == 0 && <FiChevronDown />}
                </span>
              </li>
              <li>
                {page.subPages !== undefined && (
                  <NavTree
                    pages={[{ ...page, title: "Overview", subPages: undefined }, ...page.subPages]}
                    level={level + 1}
                  />
                )}
              </li>
            </Fragment>
          );
        }
      })}
    </ul>
  );
}

export default NavTree;
