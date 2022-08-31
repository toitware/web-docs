import { styled } from "@mui/material";
import * as React from "react";
import { useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import menu from "../../../docs/menu.yaml";
import ToitLogo from "../../assets/images/toit-logo.inline.svg";
import { useAutoScroll } from "../../hooks/use_auto_scroll";
import { golden } from "../../theme";
import NavTree from "./NavTree";

const Root = styled("nav")({
  background: "black",
  color: "white",
  overflowY: "auto",
  overflowX: "hidden",
  margin: 0,
  padding: "3rem 1.5rem 9rem 3rem",
});
const Separator = styled("hr")({
  border: "none",
  height: 1,
  background: "white",
  margin: "4.5rem 1.5rem 4.5rem 0",
});
const Link = styled("a")(({ theme }) => ({
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
}));
const ArrowLeft = styled(FiArrowLeft)`
  margin-right: 1rem;
`;

/**
 * When using this component, you are in charge of positioning it with
 * `className`.
 */
export function Navigation({ className }: { className?: string }): JSX.Element {
  const navRef = useRef<HTMLElement>(null);
  useAutoScroll(navRef);

  return (
    <Root ref={navRef} className={className}>
      <a href="/">
        <ToitLogo style={{ marginBottom: "3rem" }} />
      </a>

      <NavTree pages={menu.items} />

      <Separator />

      <Link href="https://toitlang.org/">
        <ArrowLeft />{" "}
        <span>
          Go to <strong>toitlang.org</strong>
        </span>
      </Link>

      <Link href="https://github.com/toitlang">
        <ArrowLeft />{" "}
        <span>
          Go to <strong>GitHub</strong>
        </span>
      </Link>

      <Link href="https://chat.toit.io/">
        <ArrowLeft />{" "}
        <span>
          Go to <strong>Discord chat</strong>
        </span>
      </Link>

      <Link href="https://pkg.toit.io/">
        <ArrowLeft />{" "}
        <span>
          Go to <strong>pkg.toit.io</strong>
        </span>
      </Link>
    </Root>
  );
}

export default Navigation;
