import { FunctionComponent, PropsWithChildren } from "react";

import style from "./container.module.scss";

const BlogContainerComponent: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  return <div className={style["container"]}>{children}</div>;
};

export default BlogContainerComponent;
