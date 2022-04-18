//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//hooks
import useCanonical from "src/hooks/useCanonical";

const title = "Privacy Policy | Adjust to the Good Life Travel";
const description = "This Privacy Notice describes how Adjust to the Good Life Travel processes and protects the privacy of your personal information.";

const MetaComponent: FunctionComponent = () => {
  const canonical = useCanonical();

  return <NextSeo title={title} description={description} canonical={canonical} noindex={false} nofollow={false} />;
};

export default React.memo(MetaComponent);
