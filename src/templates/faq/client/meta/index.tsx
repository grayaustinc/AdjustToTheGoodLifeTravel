//node_modules
import React, { FunctionComponent } from "react";
import { NextSeo, FAQPageJsonLd } from "next-seo";

//helpers
import getImageLoaderAbsoluteSrc from "libs/helper/get-image-loader-absolute-src";

//hooks
import useCanonical from "src/hooks/useCanonical";

//data
import data from "../faq";

//images
import STATIC_IMAGE from "src/images/0986c3524f41762acb4081d207cd6a2d.png";

const title = "Frequently Asked Questions - Adjust to the Good Life Travel";
const description = "Questions frequently asked by previous customers!";

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
      <FAQPageJsonLd
        mainEntity={data.map((faq) => {
          return {
            questionName: faq.question,
            acceptedAnswerText: faq.answer.join(" "),
          };
        })}
      />
    </>
  );
};

export default React.memo(MetaComponent);
