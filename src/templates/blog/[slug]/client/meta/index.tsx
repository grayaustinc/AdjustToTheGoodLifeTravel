//node_modules
import React, { FunctionComponent } from "react";

//helpers
import getImageAbsoluteUrl from "libs/helper/get-image-absolute-url";
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//meta components
import DefaultMetaComponent from "src/components/meta/default-component";
import GoogleMetaComponent from "src/components/meta/google-component";
import BingMetaComponent from "src/components/meta/google-component";
import OgArticleMetaComponent from "src/components/meta/og-article-component";
import TwitterMetaComponent from "src/components/meta/twitter-component";

//hooks
import useWebsiteUrl from "src/hooks/useWebsiteUrl";

//images
import STATIC_IMAGE from "src/images/e3eb5953b1c0982710657979b7a22c1e.png";

interface ImageType {
  src: string;
  srcType: string;
}

interface PropsType {
  title: string;
  description: string;
  image?: ImageType | null;
  published_time: number;
  modified_time: number;
}

const MetaComponent: FunctionComponent<PropsType> = ({ title, description, image, published_time, modified_time }) => {
  const url = useWebsiteUrl();
  const src = getImageAbsoluteUrl(image, 1200) || getImageLoaderAbsoluteSrc(STATIC_IMAGE.src, 1200);

  const published = new Date(published_time).toISOString();
  const modified = new Date(modified_time).toISOString();

  return (
    <>
      <DefaultMetaComponent title={title} description={description} url={url} />
      <OgArticleMetaComponent title={title} description={description} url={url} image={src} published_time={published} modified_time={modified} />
      <TwitterMetaComponent title={title} description={description} image={src} alt={title} />
      <GoogleMetaComponent />
      <BingMetaComponent />
    </>
  );
};

export default React.memo(MetaComponent);
