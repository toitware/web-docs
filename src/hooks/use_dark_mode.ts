import { useEffect, useState } from "react";

const matchDark = "(prefers-color-scheme: dark)";

/**
 * Provides the system preference for dark mode and dynamically adapts to
 * changes.
 */
export const useDarkMode = (): boolean => {
  // Always default to dark, because that is what is rendered on the server.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const matcher = window.matchMedia(matchDark);
    setIsDark(matcher.matches);
    const onChange = ({ matches }: MediaQueryListEvent) => {
      console.log(`Switching to ${matches ? "dark" : "light"} mode.`);
      setIsDark(matches);
    };
    matcher.addEventListener("change", onChange);
    return () => matcher.removeEventListener("change", onChange);
  }, [setIsDark]);

  return isDark;
};

export default useDarkMode;
