import { makeStyles } from "@material-ui/core";
import CookieConsent from "@toitware/cookie-consent";
import Color from "color";
import * as React from "react";
import ToitLogo from "../../assets/images/toit-logo.inline.svg";
import HamburgerMenu from "../navigation/HamburgerMenu";
import SearchBar from "../search/SearchBar";

const useStyles = makeStyles((theme) => ({
  container: {
    flexShrink: 0,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${Color(theme.palette.text.primary).alpha(0.2).string()}`,
    color: theme.palette.text.primary,
    backgroundColor: Color(theme.palette.primary.main).alpha(0.05).string(),
    height: "4.5rem",
    padding: "0 2rem",
  },
  searchBar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  hamburgerMenu: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export function Header(): JSX.Element {
  const classes = useStyles();

  let segmentAPIKey = process.env.GATSBY_SEGMENT_WRITE_KEY;

  if (typeof document !== `undefined`) {
    // Check if the meta segment-key is set.
    const segmentKeyDOM = document.querySelector('meta[name="segment-key"]');
    if (segmentKeyDOM) {
      segmentAPIKey = segmentKeyDOM.getAttribute("content") || segmentAPIKey;
    }
  }
  return (
    <header className={classes.container}>
      <ToitLogo />
      <CookieConsent show={true} segmentKey={segmentAPIKey || "no-key"} changeConsent={false} />
      <SearchBar className={classes.searchBar} />
      <HamburgerMenu className={classes.hamburgerMenu} />
    </header>
  );
}

export default Header;
