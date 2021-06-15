import { useEffect, useState } from "react";

const matchDark = "(prefers-color-scheme: dark)";

/**
 * Provides the system preference for dark mode and dynamically adapts to
 * changes.
 */
export const useDarkMode = (): boolean => {
  const [isDark, setIsDark] = useState(
    () => (typeof window !== "undefined" && window.matchMedia && window.matchMedia(matchDark).matches) ?? false
  );

  useEffect(() => {
    const matcher = window.matchMedia(matchDark);

    const onChange = ({ matches }: MediaQueryListEvent) => setIsDark(matches);
    matcher.addEventListener("change", onChange);
    return () => matcher.removeEventListener("change", onChange);
  }, [setIsDark]);

  return isDark;
};

export default useDarkMode;
