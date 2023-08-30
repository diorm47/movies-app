import { useRef } from "react";

export function useDelayedFunction(action, waitTime = 400) {
  const timeoutRef = useRef(null);

  return (...parameters) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => action(...parameters), waitTime);
  };
}
