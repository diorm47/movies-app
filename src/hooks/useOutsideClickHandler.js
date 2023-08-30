import { useEffect } from "react";

export const useOutsideClickHandler = (elementRef, callback) => {
  useEffect(() => {
    const outsideClickListener = (event) => {
      const el = elementRef?.current;
      if (!el || el.contains(event?.target || null)) {
        return null;
      }

      callback(event);
    };

    document.addEventListener("mousedown", outsideClickListener);
    document.addEventListener("touchstart", outsideClickListener);

    return () => {
      document.removeEventListener("mousedown", outsideClickListener);
      document.removeEventListener("touchstart", outsideClickListener);
    };
  }, [elementRef, callback]);
};
