import { makeStyles, Typography } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { NavPage } from "./Navigation";

// This style is just added for reference.
const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    padding: 0,
    paddingLeft: "1.5rem",
  },
  level0: {
    paddingLeft: 0,
  },
  link: {
    color: theme.palette.text.primary,
  },
  active: {
    fontWeight: "bold",
  },
}));

type Props = {
  pages: NavPage[];
  level?: number;
};

function NavTree({ pages, level = 0 }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <ul className={clsx(classes.list, { [classes.level0]: level === 0 })}>
      {pages.map((page) => {
        return (
          <li key={page.slug}>
            <Typography>
              <Link to={`/${page.slug}`} className={classes.link} activeClassName={classes.active}>
                {page.title}
              </Link>
            </Typography>
            {page.subPages !== undefined && <NavTree pages={page.subPages} level={level + 1} />}
          </li>
        );
      })}
    </ul>
  );
}

export default NavTree;
