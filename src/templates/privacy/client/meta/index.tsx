//node_modules
import React, { FunctionComponent } from "react";

//meta components
import DefaultMetaComponent from "src/components/meta/default-component";
import GoogleMetaComponent from "src/components/meta/google-component";
import BingMetaComponent from "src/components/meta/google-component";

//hooks
import useWebsiteUrl from "src/hooks/useWebsiteUrl";

const title = "Privacy Policy | Adjust to the Good Life Travel";
const description = "This Privacy Notice describes how Adjust to the Good Life Travel processes and protects the privacy of your personal information.";

const MetaComponent: FunctionComponent = () => {
  const url = useWebsiteUrl();

  return (
    <>
      <DefaultMetaComponent title={title} description={description} url={url} />
      <GoogleMetaComponent />
      <BingMetaComponent />
    </>
  );
};

export default React.memo(MetaComponent);
