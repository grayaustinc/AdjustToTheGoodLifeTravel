import React from "react";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PropsType {
  title: string;
  url: string;
  description: string;
  /** image size ~1200x627*/
  image: string;
  /**ISO Format */
  published_time: string;
  /**ISO Format */
  modified_time: string;
  section?: string;
}

const OpenGraphArticleMetaComponent: FunctionComponent<PropsType> = ({ title, description, url, image, published_time, modified_time, section }) => {
  return (
    <Head>
      <meta key="og-type-meta" property="og:type" content="article" />
      <meta key="og-title-meta" property="og:title" content={title} />
      <meta key="og-url-meta" property="og:url" content={url} />
      <meta key="og-image-meta" property="og:image" content={image} />
      <meta key="og-description-meta" property="og:description" content={description} />
      <meta key="og-article:published_time-meta" property="article:published_time" content={published_time} />
      <meta key="og-article:modified_time-meta" property="article:modified_time" content={modified_time} />
      <meta key="og-article:section-meta" property="article:section" content={section || "Travel"} />
    </Head>
  );
};

export default React.memo(OpenGraphArticleMetaComponent);
