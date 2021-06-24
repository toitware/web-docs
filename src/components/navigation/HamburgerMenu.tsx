import { makeStyles } from "@material-ui/core";
import { globalHistory } from "@reach/router";
import clsx from "clsx";
import * as React from "react";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Navigation from "./Navigation";

const useStyles = makeStyles((theme) => ({
  icon: {
    cursor: "pointer",
    color: theme.palette.text.primary,
    display: "block",
    width: "3rem",
    height: "3rem",
    padding: "0.75rem",
    "& svg": {
      width: "100%",
      height: "100%",
    },
  },
  close: {
    position: "fixed",
    color: "white",
    top: "0.75rem",
    right: "2rem",
  },
  navigationContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "none",
    zIndex: 100000,
  },
  navigationContainerOpened: {
    display: "block",
  },
  navigation: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

type Props = {
  className?: string;
};

export function HamburgerMenu({ className }: Props): JSX.Element {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => globalHistory.listen(() => setIsOpen(false)), []);

  return (
    <div className={className}>
      {/* Hamburger button */}
      <a className={clsx(classes.icon)} onClick={toggleOpen}>
        <FiMenu />
      </a>

      {/* The full screen navigation overlay */}
      <div className={clsx(classes.navigationContainer, { [classes.navigationContainerOpened]: isOpen })}>
        <Navigation className={classes.navigation} />

        {/* Close button */}
        <a className={clsx(classes.icon, classes.close)} onClick={toggleOpen}>
          <FiX />
        </a>
      </div>
    </div>
  );
}

export default HamburgerMenu;
