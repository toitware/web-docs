import { makeStyles } from "@material-ui/core";
import * as React from "react";
import HamburgerMenu from "../components/navigation/HamburgerMenu";
import SearchBar from "../components/search/SearchBar";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "fixed",

    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,

    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    borderBottom: `1px solid black`,
    color: theme.palette.text.primary,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(5px)",
    height: "4.5rem",
    padding: "0rem 2rem",
  },
  searchBar: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  hamburgerMenu: {
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export function Header(): JSX.Element {
  const classes = useStyles();

  return (
    <header className={classes.container}>
      <SearchBar className={classes.searchBar} />
      <HamburgerMenu className={classes.hamburgerMenu} />
    </header>
  );
}

export default Header;
