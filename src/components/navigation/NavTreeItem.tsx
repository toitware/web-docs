import { makeStyles } from "@material-ui/core";
import { useLocation } from "@reach/router";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { useState } from "react";
import { golden } from "../../theme";
import { NavPage } from "./Navigation";
import NavTree from "./NavTree";
import { FiHome, FiCloud, FiCode, FiPlusSquare, FiLayers, FiSmile } from "react-icons/fi";

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
    textTransform: "uppercase",
    fontSize: "0.875em",
    fontWeight: 300,
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

function useSanitizedPath(): string {
  const currentPath = useLocation().pathname;

  return React.useMemo(() => {
    if (currentPath.length > 1 && currentPath.endsWith("/")) {
      return currentPath.slice(0, -1);
    } else {
      return currentPath;
    }
  }, [currentPath]);
}

type ItemProps = {
  page: NavPage;
  level: number;
};

function NavTreeItem({ page, level }: ItemProps): JSX.Element {
  const hasSubPages = page.subPages.length !== 0;

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
function LeafItem({ page }: { page: NavPage }): JSX.Element {
  const to = `/${page.slug}`;
  const classes = useStyles();
  return (
    <li key={page.slug}>
      <Link to={to} className={classes.link} activeClassName={classes.active}>
        {page.slug == "" && <FiHome className={classes.titleIcon} />}
        {page.title}
      </Link>
    </li>
  );
}

/**
 * This is a group entry. It does not link to a page.
 */
function GroupItem({ page, level }: { page: NavPage; level: number }): JSX.Element {
  const to = `/${page.slug}`;
  const classes = useStyles();
  const currentPath = useSanitizedPath();

  const isActive = currentPath.startsWith(to);

  const subPages = page.subPages ?? [];

  const [isExpanded, setIsExpanded] = useState(level != 0 || isActive);
  const toggleIsExpanded = () => {
    if (level == 0) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <li key={page.slug}>
      <span
        className={clsx(classes.link, {
          [classes.groupTitle]: level === 0,
          [classes.subGroupTitle]: level > 0,
          [classes.activeTitle]: isActive,
        })}
        onClick={toggleIsExpanded}
      >
        {page.slug == "apis" && <FiCloud className={classes.titleIcon} />}
        {page.slug == "language" && <FiCode className={classes.titleIcon} />}
        {page.slug == "peripherals" && <FiPlusSquare className={classes.titleIcon} />}
        {page.slug == "platform" && <FiLayers className={classes.titleIcon} />}
        {page.slug == "getstarted" && <FiSmile className={classes.titleIcon} />}
        {page.title}
      </span>
      {isExpanded && (
        <div className={clsx(classes.subPages, { [classes.subPages1]: level == 1 })}>
          <NavTree pages={subPages} level={level + 1} />
        </div>
      )}
    </li>
  );
}

export default NavTreeItem;
