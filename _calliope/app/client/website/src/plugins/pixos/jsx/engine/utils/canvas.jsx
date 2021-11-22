import React, { useRef, useEffect } from "react";
export function Canvas({ canvas, ...rest }) {
  const container = useRef(null);

  useEffect(() => {
    container.current.innerHTML = "";
    container.current.append(canvas);
  }, [container, canvas]);

  return <div ref={container} />;
}
