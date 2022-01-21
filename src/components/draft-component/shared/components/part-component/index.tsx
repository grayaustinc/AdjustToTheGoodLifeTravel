import React, { FunctionComponent } from "react";

import style from "./part.module.scss";

const PartComponent: FunctionComponent = () => {
  return (
    <span className={style["inline"]}>
      <hr className={style["divider"]} />
    </span>
  );
};

export default React.memo(PartComponent);
