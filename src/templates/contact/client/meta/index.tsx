//node_modules
import React, { FunctionComponent } from "react";
import { CorporateContactJsonLd } from "next-seo";
import { NextSeo } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";
import getWebsiteUrl from "libs/helper/get-website-url";

//hooks
import useCanonical from "src/hooks/useCanonical";

//images
import STATIC_IMAGE from "src/images/9b2e4478ec513ae0dd73fb5bcadf4a4e.png";

const title = "Contact Us - Adjust to the Good Life Travel";
const description = "Contact one of our travel agents by phone, email, or fill out a form!";

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
      <CorporateContactJsonLd
        keyOverride="json-contact"
        url={getWebsiteUrl("/")}
        contactPoint={[
          {
            telephone: "+1-919-810-3743",
            contactType: "travel agent",
            areaServed: "US",
            availableLanguage: "English",
          },
          {
            telephone: "+1-919-710-2657",
            contactType: "travel agent",
            areaServed: "US",
            availableLanguage: "English",
          },
        ]}
      />
    </>
  );
};

export default React.memo(MetaComponent);
