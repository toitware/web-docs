import * as React from "react";
import { useEffect } from "react";
import useSanitizedPath from "./use_sanitized_path";

/**
 * Automatically scrolls to the selected nav item.
 *
 * The provided `navRef` is the container of all the navigation links that will
 * be used to scroll. When a new route is being trigger by the reach router,
 * this hook will look for any <a> element where `href` is the new
 * `location.pathname`. If it finds the element it will make sure that it is
 * currently visible in the container.
 */
export const useAutoScroll = (navRef: React.RefObject<Element>): void => {
  const currentPath = useSanitizedPath();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const activeLink = nav.querySelector(`a[href="${currentPath}"]`);

    if (!activeLink) {
      console.warn(`Nav link for ${currentPath} not found.`);
      return;
    }

    const spacing = 20;
    const rect = activeLink.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    let newTop: number | undefined;

    if (rect.top < 0) {
      newTop = nav.scrollTop + rect.top - spacing;
    } else if (rect.bottom > navRect.height) {
      newTop = nav.scrollTop + rect.top - navRect.height + rect.height + spacing;
    }

    if (typeof newTop !== "undefined") {
      nav.scrollTo({
        left: nav.scrollLeft,
        behavior: "smooth",
        top: newTop,
      });
    }
  }, [navRef, currentPath]);
};
