import React, { useEffect, useRef, useState } from "react";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
const modulo = (a: number, n: number): number => ((a % n) + n) % n;

type SearchContext = {
  selectedIndex: number;
  resultCount: number;
  showResults: boolean;
};

/**
 * Given a number of results, and whether the results are currently being shown,
 * this effect handles the currently selected index and handles up and down keys
 * accordingly.
 *
 * It returns the index and the setter for the index the same way as if you were
 * to use `useState(0)` yourself.
 */
export function useResultSelection(
  resultCount: number,
  showResults: boolean
): [number, React.Dispatch<React.SetStateAction<number>>] {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const currentSearchContext = {
    selectedIndex: selectedIndex,
    resultCount: resultCount,
    showResults: showResults,
  };
  const searchContextRef = useRef<SearchContext>(currentSearchContext);
  searchContextRef.current = currentSearchContext;

  useEffect(() => {
    function handleKeys(e: KeyboardEvent) {
      const searchContext = searchContextRef.current;
      if (!searchContext.showResults) return;

      const current = searchContext.selectedIndex;
      const length = searchContext.resultCount;

      if (e.key == "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(modulo(current + 1, length));
      } else if (e.key == "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(modulo(current - 1, length));
      }
    }
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [searchContextRef]);

  return [selectedIndex, setSelectedIndex];
}

export default useResultSelection;
