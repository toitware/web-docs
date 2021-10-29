import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { FiBookOpen, FiCloud, FiCode, FiGrid, FiHome, FiLayers, FiPlay, FiTool } from "react-icons/fi";
import useSanitizedPath from "../../hooks/use_sanitized_path";
import { golden } from "../../theme";
import NavTree from "./NavTree";

import { MenuItem } from "../../../docs/menu.yaml";
const useStyles = makeStyles((theme) => ({
  link: {
    color: "white",
    fontFamily: theme.typography.fontFamily,
    display: "flex",
    alignItems: "center",
    lineHeight: "1.5rem",
    margin: "0.5rem 0",
  },
  titleIcon: {
    marginRight: "1rem",
  },
  groupTitle: {
    margin: "1.5rem 0",
    cursor: "pointer",
  },
  subGroupTitle: {
    margin: "1rem 0",
  },
  subPages: {},
  subPages1: {
    borderLeft: "1px solid rgba(255, 255, 255, 0.5)",
  },
  activeTitle: {
    color: golden.toString(),
  },
  active: {
    color: golden.toString(),
    opacity: 1,
  },
}));

type ItemProps = {
  page: MenuItem;
  level: number;
};

function NavTreeItem({ page, level }: ItemProps): JSX.Element {
  const hasSubPages = !!page.children;

  if (!hasSubPages) {
    return <LeafItem page={page} />;
  } else {
    return <GroupItem page={page} level={level} />;
  }
}

/**
 * This is a "leaf" entry: it doesn't have subpages so it is a direct link to a
 * page.
 */
function LeafItem({ page }: { page: MenuItem }): JSX.Element {
  const classes = useStyles();

  const Content = (
    <>
      <Icon page={page} />
      {page.name}
    </>
  );
  return (
    <li key={page.path}>
      {!page.href && (
        <Link to={page.path} className={classes.link} activeClassName={classes.active}>
          {Content}
        </Link>
      )}
      {page.href && (
        <a href={page.href} target="_blank" rel="noreferrer" className={classes.link}>
          {Content}
        </a>
      )}
    </li>
  );
}

/**
 * This is a group entry. It does not link to a page.
 */
function GroupItem({ page, level }: { page: MenuItem; level: number }): JSX.Element {
  const classes = useStyles();

  const currentPath = useSanitizedPath();
  const isActive = currentPath.startsWith(page.path);

  const subPages = page.children ?? [];

  return (
    <li key={page.path}>
      <Link
        to={page.path}
        className={clsx(classes.link, {
          [classes.groupTitle]: level === 0,
          [classes.subGroupTitle]: level > 0,
          [classes.activeTitle]: isActive,
        })}
      >
        <Icon page={page} />
        {page.name}
      </Link>
      {isActive && (
        <div className={clsx(classes.subPages, { [classes.subPages1]: level == 1 })}>
          <NavTree pages={subPages} level={level + 1} />
        </div>
      )}
    </li>
  );
}

// If you want to add an icon, make sure to also add it to
// `src/@types/index.d.ts`
const Icon = ({ page }: { page: MenuItem }): JSX.Element => {
  const classes = useStyles();

  switch (page.icon) {
    case "home":
      return <FiHome className={classes.titleIcon} />;
    case "apis":
      return <FiCloud className={classes.titleIcon} />;
    case "language":
      return <FiCode className={classes.titleIcon} />;
    case "hardware":
      return <FiGrid className={classes.titleIcon} />;
    case "platform":
      return <FiLayers className={classes.titleIcon} />;
    case "getstarted":
      return <FiPlay className={classes.titleIcon} />;
    case "troubleshoot":
      return <FiTool className={classes.titleIcon} />;
    case "tutorials":
      return <FiBookOpen className={classes.titleIcon} />;
    case undefined:
      return <></>;
  }
};
export default NavTreeItem;
