import { styled } from "@mui/material";
import * as React from "react";
import { MenuItem } from "../../../docs/menu.yaml";
import NavTreeItem from "./NavTreeItem";

const List = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  paddingLeft: "1rem",
});

type Props = {
  pages: MenuItem[];
  level?: number;
};

function NavTree({ pages, level = 0 }: Props): JSX.Element {
  return (
    <List
      sx={{
        ...(level === 0 && { pl: 0 }),
        ...(level === 2 && { borderLeft: "1px solid rgba(255, 255, 255, 0.5)" }),
      }}
    >
      {pages.map((page) => (
        <NavTreeItem key={page.path} page={page} level={level} />
      ))}
    </List>
  );
}

export default NavTree;
