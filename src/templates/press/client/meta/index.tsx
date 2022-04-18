//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/3a09d58794098791c474322bf5cca573.png";

const title = "Press - Adjust to the Good Life Travel";
const description = "Here is a list of places that we've been mentioned from all over the internet!";

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
