//node_modules
import React, { FunctionComponent } from "react";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//meta components
import DefaultMetaComponent from "src/components/meta/default-component";
import GoogleMetaComponent from "src/components/meta/google-component";
import BingMetaComponent from "src/components/meta/google-component";
import OgWebsiteMetaComponent from "src/components/meta/og-website-component";
import TwitterMetaComponent from "src/components/meta/twitter-component";

//hooks
import useWebsiteUrl from "src/hooks/useWebsiteUrl";

//images
import STATIC_IMAGE from "src/images/5f7cbe2dc628e35784b204b6d16dba89.png";

const title = "Sandals & Beaches Resorts - Adjust to the Good Life Travel";
const description = "We are a certified Sandals Travel Agency and are always prepared to give you the best Sandals Vacation!";

const MetaComponent: FunctionComponent = () => {
  const url = useWebsiteUrl();
  const src = getImageLoaderAbsoluteSrc(STATIC_IMAGE.src, 1200);

  return (
    <>
      <DefaultMetaComponent title={title} description={description} url={url} />
      <OgWebsiteMetaComponent title={title} description={description} url={url} image={src} />
      <TwitterMetaComponent title={title} description={description} image={src} alt="Adjust to the Good Life Travel" />
      <GoogleMetaComponent />
      <BingMetaComponent />
    </>
  );
};

export default React.memo(MetaComponent);
