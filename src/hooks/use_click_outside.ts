import * as React from "react";
import { useEffect, useRef } from "react";

/**
 * Invokes callback whenever a click was made outside the elRef.
 */
export const useClickOutside = (elRef: React.RefObject<HTMLElement>, callback: (e: MouseEvent) => void): void => {
  // Wrapping the callback in a ref, because we don't want to rebuild the effect
  // on every render.
  const callbackRef = useRef<(e: MouseEvent) => void>();
  callbackRef.current = callback;

  useEffect(() => {
    if (!callbackRef.current) return;
    const callback = callbackRef.current;

    const onClick = (e: MouseEvent) => {
      if (!elRef?.current?.contains(<HTMLElement>e.target)) {
        callback(e);
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [elRef, callbackRef]);
};

export default useClickOutside;
