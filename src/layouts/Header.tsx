import { styled } from "@mui/material/styles";
import Color from "color";
import * as React from "react";
import HamburgerMenu from "../components/navigation/HamburgerMenu";
import SearchBar from "../components/search/SearchBar";

const Container = styled("header")(({ theme }) => ({
  position: "fixed",

  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,

  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  borderBottom: `1px solid ${theme.palette.text.primary}`,
  color: theme.palette.text.primary,
  backgroundColor: Color(theme.palette.background.default).alpha(0.7).toString(),
  backdropFilter: "blur(5px)",
  height: "4.5rem",
  padding: "0rem calc(2rem - 0.75rem) 0 2rem", // Remove the right padding of the navbar button
}));

const Hamburger = styled(HamburgerMenu)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export function Header(): JSX.Element {
  return (
    <Container>
      <SearchBar />
      <Hamburger />
    </Container>
  );
}

export default Header;
