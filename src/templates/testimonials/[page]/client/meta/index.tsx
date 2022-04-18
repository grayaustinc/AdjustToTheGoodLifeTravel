//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/c5468374eda37b1d6935312eeb5c08ee.png";

const title = `Testimonials - Adjust to the Good Life Travel`;
const description = `Here are some Testimonials from Adjust to the Good Life Travel customers!`;

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
