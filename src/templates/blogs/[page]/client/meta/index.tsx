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
import STATIC_IMAGE from "src/images/152f1c9d2e9be4f4019deaf6a9ecb6b3.png";

const title = "Blog - Adjust to the Good Life Travel";
const description = "A list of all blog posts published by Adjust to the Good Life Travel";

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
