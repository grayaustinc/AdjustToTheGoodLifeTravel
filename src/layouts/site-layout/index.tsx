//node_modules
import React, { FunctionComponent, PropsWithChildren, useEffect } from "react";
import getConfig from "next/config";

//src constants
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";
import { useEffectOnce } from "react-use";

const { publicRuntimeConfig } = getConfig();

const SiteLayout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <React.Fragment>
      <HeaderComponent />
      {children}
      <div className="my-auto" />
      <FooterComponent />
    </React.Fragment>
  );
};

export default SiteLayout;
