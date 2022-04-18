//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/4e0142fbb8e66f2290524c0bf6f225a1.png";

const title = "Services we Provide - Adjust to the Good Life Travel";
const description = "A list of services that our Travel Agents can help with!";

const MetaComponent: FunctionComponent = () => {
  const canonical = useCanonical();
  const src = getImageLoaderAbsoluteSrc(STATIC_IMAGE.src, 1200);

  return (
    <NextSeo
      title={title}
      description={description}
      canonical={canonical}
      noindex={false}
      nofollow={false}
      openGraph={{
        type: "website",
        site_name: "Adjust to the Good Life Travel",
        url: canonical,
        title: title,
        description: description,
        images: [
          {
            url: src,
          },
        ],
      }}
      twitter={{
        cardType: "summary_large_image",
      }}
    />
  );
};

export default React.memo(MetaComponent);
