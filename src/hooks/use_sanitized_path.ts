import { useLocation } from "@reach/router";
import React from "react";

export function useSanitizedPath(): string {
  const currentPath = useLocation().pathname;

  return React.useMemo(() => {
    if (currentPath.length > 1 && currentPath.endsWith("/")) {
      return currentPath.slice(0, -1);
    } else {
      return currentPath;
    }
  }, [currentPath]);
}

export default useSanitizedPath;
