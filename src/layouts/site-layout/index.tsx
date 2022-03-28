//node_modules
import React, { FunctionComponent, useEffect } from "react";
import Script from "next/script";

//libs
import matomo from "libs/matomo";

//src constants
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

const SiteLayout: FunctionComponent = ({ children }) => {
  useEffect(() => {
    matomo.trackPageView();
    matomo.enableLinkTracking(true);
    return () => {
      matomo.enableLinkTracking(false);
    };
  }, []);

  return (
    <React.Fragment>
      <Script key="matomo-analytics-script" src={matomo.getScriptSrc()} strategy="afterInteractive" defer />
      <HeaderComponent />
      {children}
      <div className="my-auto" />
      <FooterComponent />
    </React.Fragment>
  );
};

export default SiteLayout;
