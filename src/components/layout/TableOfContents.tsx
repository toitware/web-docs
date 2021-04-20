import { makeStyles } from "@material-ui/core";
import Color from "color";
import { Link } from "gatsby";
import * as React from "react";
import { TableOfContents, TableOfContentsItem } from "./Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "sticky",
    marginTop: theme.spacing(6),
    width: "15rem",
    "& ul": {
      listStyle: "none",
      margin: 0,
      background: Color(theme.palette.primary.main).alpha(0.06).desaturate(0.6).string(),
      padding: "1.5rem",
      borderRadius: "5px",
    },
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: "0.875rem",
    fontFamily: theme.typography.fontFamily,
    opacity: 0.8,
    marginBottom: "0.75rem",
    display: "block",
    "&:hover": {
      color: theme.palette.primary.main,
      opacity: 1,
    },
  },
}));

type Props = {
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
export function TableOfContentsNav({ table }: Props): JSX.Element {
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
    <nav className={classes.root}>
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
