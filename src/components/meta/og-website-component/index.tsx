import React from "react";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PropsType {
  title: string;
  description: string;
  url: string;
  /** image size ~1200x627*/
  image: string;
}

const OpenGraphWebsiteMetaComponent: FunctionComponent<PropsType> = ({ title, description, url, image }) => {
  return (
    <Head>
      <meta key="og-type-meta" property="og:type" content="website" />
      <meta key="og-title-meta" property="og:title" content={title} />
      <meta key="og-description-meta" property="og:description" content={description} />
      <meta key="og-url-meta" property="og:url" content={url} />
      <meta key="og-image-meta" property="og:image" content={image} />
    </Head>
  );
};

export default React.memo(OpenGraphWebsiteMetaComponent);
