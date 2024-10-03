import { useEffect } from "react";

export const useHoverOutside = (ref, fn) => {
  useEffect(() => {
    const handleHoverOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        fn();
      }
    };

    document.addEventListener("mouseLeave", handleHoverOutside);
    return () => {
      document.removeEventListener("mouseLeave", handleHoverOutside);
    };
  }, [ref, fn]);
};
