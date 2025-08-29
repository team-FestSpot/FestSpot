import React, { useEffect, useState } from "react";

export const useParentSize = (ref) => {
  const [parentWidth, setParentWidth] = useState(0);
  const [parentHeight, setParentHeight] = useState(0);

  useEffect(() => {
    if (!ref.current?.parentNode) return;

    const parent = ref.current.parentNode;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setParentWidth(entry.contentRect.width);
        setParentHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, [ref]);

  return { parentWidth, parentHeight };
};
