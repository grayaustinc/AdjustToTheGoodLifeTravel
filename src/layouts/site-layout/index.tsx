//node_modules
import React, { FunctionComponent, useEffect } from "react";

//libs
import matomo from "libs/matomo";

//src constants
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

const SiteLayout: FunctionComponent = ({ children }) => {
  useEffect(() => {
    matomo.trackPageView();
    matomo.enableLinkTracking(true);
  }, []);

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
