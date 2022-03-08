import React, { FunctionComponent, useEffect } from "react";
import ReactGA from "react-ga4";

import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

const SiteLayout: FunctionComponent = ({ children }) => {
  useEffect(() => {
    ReactGA.initialize("G-75WT0B1EJB");
    ReactGA.send("pageview");
  }, []);

  return (
    <>
      <HeaderComponent />
      {children}
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default SiteLayout;
