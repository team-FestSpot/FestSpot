import React, { useEffect, useState } from "react";

export const useDivSize = (ref) => {
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const div = ref.current;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDivWidth(entry.contentRect.width);
        setDivHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(div);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return { divWidth, divHeight };
};
