import React, { FunctionComponent } from "react";

import style from "./link.module.scss";

interface LinkProps {
  href: string;
}

const LinkComponent: FunctionComponent<LinkProps> = ({ href, children }) => {
  return (
    <a className={style["link"]} href={href} target="_blank">
      {children}
    </a>
  );
};

export default LinkComponent;
