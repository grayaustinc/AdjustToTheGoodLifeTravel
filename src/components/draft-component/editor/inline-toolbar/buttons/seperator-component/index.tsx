import React, { FunctionComponent } from "react";

import style from "./seperator.module.scss";

const SeperatorComponent: FunctionComponent = () => {
  return <span className={style["seperator"]} />;
};

export default React.memo(SeperatorComponent);
