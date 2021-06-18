import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";
import { NavPage } from "./Navigation";
import NavTreeItem from "./NavTreeItem";

const useStyles = makeStyles((theme) => ({
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  level0: {},
  level1: {},
  level2: {
    paddingLeft: theme.spacing(2),
  },
  level3: {
    paddingLeft: theme.spacing(2),
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
        [classes.level1]: level === 1,
        [classes.level2]: level === 2,
        [classes.level3]: level === 3,
      })}
    >
      {pages.map((page) => (
        <NavTreeItem key={page.slug} page={page} level={level} />
      ))}
    </ul>
  );
}

export default NavTree;
