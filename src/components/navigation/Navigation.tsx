import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import * as React from "react";
import { useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import menu from "../../../docs/menu.yaml";
import ToitLogo from "../../assets/images/toit-logo.inline.svg";
import { useAutoScroll } from "../../hooks/use_auto_scroll";
import { golden } from "../../theme";
import NavTree from "./NavTree";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "black",
    color: "white",
    overflowY: "auto",
    overflowX: "hidden",
    margin: 0,
    padding: "3rem 1.5rem 9rem 3rem",
  },
  toitLogo: {
    marginBottom: "3rem",
  },
  link: {
    color: "white",
    fontFamily: theme.typography.fontFamily,
    display: "flex",
    alignItems: "center",
    lineHeight: "1.5rem",
    margin: "0.5rem 0",
    "& strong": {
      fontWeight: "normal",
      color: golden.toString(),
    },
  },
  separator: {
    border: "none",
    height: 1,
    background: "white",
    margin: "4.5rem 1.5rem 4.5rem 0",
  },
  backArrow: {
    marginRight: "1rem",
  },
}));

/**
 * When using this component, you are in charge of positioning it with
 * `className`.
 */
export function Navigation({ className }: { className?: string }): JSX.Element {
  const classes = useStyles();

  const navRef = useRef<HTMLElement>(null);
  useAutoScroll(navRef);

  return (
    <nav ref={navRef} className={clsx(classes.root, className)}>
      <a href="/">
        <ToitLogo className={classes.toitLogo} />
      </a>

      <NavTree pages={menu.items} />

      <hr className={classes.separator} />

      <a className={classes.link} href="https://toit.io">
        <FiArrowLeft className={classes.backArrow} />{" "}
        <span>
          Go to <strong>toit.io</strong>
        </span>
      </a>

      <a className={classes.link} href="https://pkg.toit.io/">
        <FiArrowLeft className={classes.backArrow} />{" "}
        <span>
          Go to <strong>pkg.toit.io</strong>
        </span>
      </a>
    </nav>
  );
}

export default Navigation;
