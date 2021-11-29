import { styled } from "@mui/material";
import { globalHistory } from "@reach/router";
import * as React from "react";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Navigation from "./Navigation";

const IconToggle = styled("a")(({ theme }) => ({
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
}));

const CloseIconToggle = styled(IconToggle)({
  position: "fixed",
  color: "white",
  top: "0.75rem",
  right: "2rem",
});

const NavigationContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  display: "none",
  zIndex: 100000,
});

const StyledNavigation = styled(Navigation)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
});

type Props = {
  className?: string;
};

export function HamburgerMenu({ className }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => globalHistory.listen(() => setIsOpen(false)), []);

  return (
    <div className={className}>
      {/* Hamburger button */}
      <IconToggle onClick={toggleOpen}>
        <FiMenu />
      </IconToggle>

      {/* The full screen navigation overlay */}
      <NavigationContainer
        sx={{
          ...(isOpen && { display: "block" }),
        }}
      >
        <StyledNavigation />

        {/* Close button */}
        <CloseIconToggle onClick={toggleOpen}>
          <FiX />
        </CloseIconToggle>
      </NavigationContainer>
    </div>
  );
}

export default HamburgerMenu;
