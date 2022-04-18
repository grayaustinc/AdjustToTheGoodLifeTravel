//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//hooks
import useCanonical from "src/hooks/useCanonical";

const title = "Page Not Found - Adjust to the Good Life Travel";
const description = "This page could not be found!";

const MetaComponent: FunctionComponent = () => {
  const canonical = useCanonical();

  return <NextSeo title={title} description={description} canonical={canonical} noindex={true} nofollow={false} />;
};

export default React.memo(MetaComponent);
