import { FunctionComponent } from "react";

import style from "./container.module.scss";

const BlogContainerComponent: FunctionComponent = ({ children }) => {
  return <div className={style["container"]}>{children}</div>;
};

export default BlogContainerComponent;
