import { useEffect, useState } from "react";

const matchDark = "(prefers-color-scheme: dark)";
export const useDarkMode = (): boolean => {
  const [isDark, setIsDark] = useState(() => window.matchMedia && window.matchMedia(matchDark).matches);

  useEffect(() => {
    const matcher = window.matchMedia(matchDark);

    const onChange = ({ matches }: MediaQueryListEvent) => setIsDark(matches);
    matcher.addEventListener("change", onChange);
    return () => matcher.removeEventListener("change", onChange);
  }, [setIsDark]);

  return isDark;
};

export default useDarkMode;
