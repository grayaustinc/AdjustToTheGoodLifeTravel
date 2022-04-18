//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/152f1c9d2e9be4f4019deaf6a9ecb6b3.png";

const title = "Blog - Adjust to the Good Life Travel";
const description = "A list of all blog posts published by Adjust to the Good Life Travel";

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
