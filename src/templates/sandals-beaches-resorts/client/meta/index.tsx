//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/5f7cbe2dc628e35784b204b6d16dba89.png";

const title = "Sandals & Beaches Resorts - Adjust to the Good Life Travel";
const description = "We are a certified Sandals Travel Agency and are always prepared to give you the best Sandals Vacation!";

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
