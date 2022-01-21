import React from "react";
import Head from "next/head";
import { FunctionComponent, useEffect } from "react";

interface PropsType {
  title: string;
  description: string;
  /**Supports an aspect ratio of 2:1 with minimum dimensions of 300x157 or maximum of 4096x4096 pixels. Image must be less then 5MB in size. JPG, PNG, WEBP and GIF formats are supported. */
  image: string;
  alt?: string;
}

const TwitterMetaComponent: FunctionComponent<PropsType> = ({ title, description, image, alt }) => {
  return (
    <Head>
      <meta key="twitter-card-meta" name="twitter:card" content="summary_large_image" />
      <meta key="twitter-title-meta" name="twitter:title" content={title} />
      <meta key="twitter-description-meta" name="twitter:description" content={description} />
      <meta key="twitter-image-meta" name="twitter:image" content={image} />
      <meta key="twitter-image:alt-meta" name="twitter:image:alt" content={alt} />
    </Head>
  );
};

export default React.memo(TwitterMetaComponent);
