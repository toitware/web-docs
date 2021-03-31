import { makeStyles, Typography } from "@material-ui/core";
import Color from "color";
import * as React from "react";
import ToitLogo from "../../assets/images/toit-logo.inline.svg";
import SearchBar from "../search/SearchBar";

const useStyles = makeStyles((theme) => ({
  container: {
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
    color: theme.palette.text.primary,
    backgroundColor: Color(theme.palette.primary.main).alpha(0.1).string(),
    height: "4.5rem",
    padding: "0 1.5rem",
  },
}));

export function Header(): JSX.Element {
  const classes = useStyles();
  return (
    <header className={classes.container}>
      <ToitLogo />
      <SearchBar />
    </header>
  );
}

export default Header;
