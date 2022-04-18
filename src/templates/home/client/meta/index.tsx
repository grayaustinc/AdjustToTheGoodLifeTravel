//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo, SocialProfileJsonLd } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";
import getWebsiteUrl from "libs/helper/get-website-url";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/5f7cbe2dc628e35784b204b6d16dba89.png";

const title = "Adjust to the Good Life Travel | Raleigh Based Travel Agency";
const description = "I am a Raleigh, NC based travel agent who specializes in helping families and couples find and experience the most amazing dream vacations.";

const MetaComponent: FunctionComponent = () => {
  const canonical = useCanonical();
  const src = getImageLoaderAbsoluteSrc(STATIC_IMAGE.src, 1200);

  return (
    <>
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
      <SocialProfileJsonLd
        keyOverride="json-socials"
        type="Organization"
        name="Adjust to the Good Life Travel"
        url={getWebsiteUrl("/")}
        sameAs={["https://www.facebook.com/AdjusttotheGoodLifeTravel/", "https://www.instagram.com/adjusttothegoodlifetravel/"]}
      />
    </>
  );
};

export default React.memo(MetaComponent);
