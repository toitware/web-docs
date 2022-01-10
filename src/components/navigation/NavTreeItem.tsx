import { Collapse, styled } from "@mui/material";
import { Link } from "gatsby";
import * as React from "react";
import { FiBookOpen, FiCloud, FiCode, FiCpu, FiGrid, FiHome, FiLayers, FiPlay, FiTool } from "react-icons/fi";
import { MenuItem } from "../../../docs/menu.yaml";
import useSanitizedPath from "../../hooks/use_sanitized_path";
import { golden } from "../../theme";
import NavTree from "./NavTree";

const StyledLink = styled(Link)(({ theme }) => ({
  color: "white",
  fontFamily: theme.typography.fontFamily,
  display: "flex",
  alignItems: "center",
  lineHeight: "1.5rem",
}));

const IconWrapper = styled("div")`
  display: block;
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

type ItemProps = {
  page: MenuItem;
  level: number;
};

function NavTreeItem({ page, level }: ItemProps): JSX.Element {
  const currentPath = useSanitizedPath();
  const isActive =
    (page.path == "/" && currentPath == page.path) || (page.path != "/" && currentPath.startsWith(page.path));

  const subPages = page.children ?? [];

  return (
    <li key={page.path} style={{ margin: "1rem 0" }}>
      <StyledLink to={page.path} sx={{ ...(isActive && { color: golden.toString() }) }}>
        <Icon page={page} />
        {page.name}
      </StyledLink>
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
  let component: JSX.Element | undefined;

  switch (page.icon) {
    case "home":
      component = <FiHome />;
      break;
    case "apis":
      component = <FiCloud />;
      break;
    case "language":
      component = <FiCode />;
      break;
    case "firmware":
      component = <FiGrid />;
      break;
    case "peripherals":
      component = <FiCpu />;
      break;
    case "platform":
      component = <FiLayers />;
      break;
    case "getstarted":
      component = <FiPlay />;
      break;
    case "support":
      component = <FiTool />;
      break;
    case "tutorials":
      component = <FiBookOpen />;
      break;
  }

  return component ? <IconWrapper>{component}</IconWrapper> : <></>;
};
export default NavTreeItem;
