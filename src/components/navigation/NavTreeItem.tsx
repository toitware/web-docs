import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { FiCloud, FiCode, FiGrid, FiHome, FiLayers, FiPlay } from "react-icons/fi";
import useSanitizedPath from "../../hooks/use_sanitized_path";
import { golden } from "../../theme";
import { NavPage } from "./Navigation";
import NavTree from "./NavTree";

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

  useEffect(() => {
    // If the page navigated and we have a new active path, make sure that
    // the menu is open.
    // This can only happen when the user clicks a link in the docs content,
    // because otherwise the menu needs to be open to actually navigate there
    // (or a link has been used, in which case it's open because it gets set
    // at startup).
    if (isActive) {
      setIsExpanded(true);
    }
  }, [isActive, setIsExpanded]);

  // Because we don't want to wait for the hook above to finish before we draw
  // the expanded items (since otherwise the useAutoScroll() effect doesn't
  // work) we check if the previous isActive state was `false`, and if so, we
  // know that this just changed from inactive to active and it should be
  // expanded.
  //
  // In the next render cycle the above hook will have finished and the
  // `isExpanded` state will be correct.
  let showExpanded = isExpanded;
  const wasActiveRef = useRef<boolean>(false);
  if (wasActiveRef.current === false && isActive) showExpanded = true;
  wasActiveRef.current = isActive;

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
        {page.slug == "peripherals" && <FiGrid className={classes.titleIcon} />}
        {page.slug == "platform" && <FiLayers className={classes.titleIcon} />}
        {page.slug == "getstarted" && <FiPlay className={classes.titleIcon} />}
        {page.title}
      </span>
      {showExpanded && (
        <div className={clsx(classes.subPages, { [classes.subPages1]: level == 1 })}>
          <NavTree pages={subPages} level={level + 1} />
        </div>
      )}
    </li>
  );
}

export default NavTreeItem;
