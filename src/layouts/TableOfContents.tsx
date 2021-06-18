import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";

export type TableOfContents = {
  items: TableOfContentsItem[];
};

export type TableOfContentsItem = {
  url: string;
  title: string;
  items?: TableOfContentsItem[];
};

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: "sticky",
    top: theme.spacing(18),
    alignSelf: "flex-start",
    width: "15rem",
    borderLeft: "1px solid black",
    paddingLeft: "1.5rem",
    "& ul": {
      listStyle: "none",
      padding: 0,
      margin: "-1.5rem 0",
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  link: {
    color: theme.palette.text.primary,
    fontFamily: theme.typography.fontFamily,
    opacity: 0.8,
    margin: "1.5rem 0",
    display: "block",
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: 1,
    },
  },
}));

type Props = {
  className?: string;
  table: TableOfContents;
};

type ContentsEntry = {
  title: string;
  url: string;
};

/**
 * The actual content of the layout, separated into its own component so it has
 * access to the theme.
 */
export function TableOfContentsNav({ table, className }: Props): JSX.Element {
  const classes = useStyles();

  function flatten(table: TableOfContentsItem | TableOfContents, list: ContentsEntry[] = []): ContentsEntry[] {
    if (table.items === undefined) return list;

    for (const item of table.items) {
      list.push({ title: item.title, url: item.url });
      flatten(item, list);
    }
    return list;
  }

  const flatTable = flatten(table);

  return (
    <nav className={clsx(classes.wrapper, className)}>
      <ul>
        {flatTable.map((item) => (
          <li key={item.url}>
            <Link className={classes.link} to={item.url}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TableOfContentsNav;
