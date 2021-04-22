import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Navigation from "./Navigation";

const useStyles = makeStyles((theme) => ({
  icon: {
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
    top: "0.75rem",
    right: "2rem",
    background: theme.palette.background.default,
    borderRadius: "3rem",
  },
  navigation: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    display: "none",
    position: "fixed",
    background: theme.palette.background.default,
    padding: "3rem 1.5rem",
    overflowY: "scroll",
  },
  navigationOpened: {
    display: "block",
  },
}));

type Props = {
  className?: string;
};

/**
 * The actual content of the layout, separated into its own component so it has
 * access to the theme.
 */
export function HamburgerMenu({ className }: Props): JSX.Element {
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <a href="#" className={classes.icon} onClick={() => setIsOpen(!isOpen)}>
        <FiMenu />
      </a>
      <div className={clsx(classes.navigation, { [classes.navigationOpened]: isOpen })}>
        <Navigation />
        <a href="#" className={clsx(classes.icon, classes.close)} onClick={() => setIsOpen(false)}>
          <FiX />
        </a>
      </div>
    </div>
  );
}

export default HamburgerMenu;
