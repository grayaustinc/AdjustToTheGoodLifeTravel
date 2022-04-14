import React, { forwardRef, PropsWithChildren } from "react";

import style from "../../styles/parallax.module.scss";

const ParallaxChildren = forwardRef<HTMLDivElement, PropsWithChildren<{}>>(({ children }, ref) => (
  <div ref={ref} className={style["content"]}>
    {children}
  </div>
));

export default ParallaxChildren;
