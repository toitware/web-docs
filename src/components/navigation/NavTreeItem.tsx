import { Collapse, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Link } from "gatsby";
import * as React from "react";
import { FiBookOpen, FiCloud, FiCode, FiCpu, FiGrid, FiHome, FiLayers, FiPlay, FiTool } from "react-icons/fi";
import { MenuItem } from "../../../docs/menu.yaml";
import useSanitizedPath from "../../hooks/use_sanitized_path";
import { golden } from "../../theme";
import NavTree from "./NavTree";

const useStyles = makeStyles((theme) => ({
  li: {
    margin: "1rem 0",
  },
  link: {
    color: "white",
    fontFamily: theme.typography.fontFamily,
    display: "flex",
    alignItems: "center",
    lineHeight: "1.5rem",
  },
  icon: {
    marginRight: "1rem",
  },
  active: {
    color: golden.toString(),
  },
}));

type ItemProps = {
  page: MenuItem;
  level: number;
};

function NavTreeItem({ page, level }: ItemProps): JSX.Element {
  const classes = useStyles();
  const currentPath = useSanitizedPath();
  const isActive =
    (page.path == "/" && currentPath == page.path) || (page.path != "/" && currentPath.startsWith(page.path));

  const subPages = page.children ?? [];

  return (
    <li key={page.path} className={classes.li}>
      <Link
        to={page.path}
        className={clsx(classes.link, {
          [classes.active]: isActive,
        })}
      >
        <Icon page={page} />
        {page.name}
      </Link>
      {subPages.length > 0 && (
        <Collapse in={isActive}>
          <NavTree pages={subPages} level={level + 1} />
        </Collapse>
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
      return <FiHome className={classes.icon} />;
    case "apis":
      return <FiCloud className={classes.icon} />;
    case "language":
      return <FiCode className={classes.icon} />;
    case "firmware":
      return <FiGrid className={classes.icon} />;
    case "peripherals":
      return <FiCpu className={classes.icon} />;
    case "platform":
      return <FiLayers className={classes.icon} />;
    case "getstarted":
      return <FiPlay className={classes.icon} />;
    case "support":
      return <FiTool className={classes.icon} />;
    case "tutorials":
      return <FiBookOpen className={classes.icon} />;
    case undefined:
      return <></>;
  }
};
export default NavTreeItem;
