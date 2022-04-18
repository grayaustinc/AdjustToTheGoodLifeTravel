//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//hooks
import useCanonical from "src/hooks/useCanonical";

const title = "Server Error - Adjust to the Good Life Travel";
const description = "An error occurred while loading this page!";

const MetaComponent: FunctionComponent = () => {
  const canonical = useCanonical();

  return <NextSeo title={title} description={description} canonical={canonical} noindex={true} nofollow={false} />;
};

export default React.memo(MetaComponent);
