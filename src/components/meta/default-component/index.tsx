import React from "react";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PropsType {
  title: string;
  description: string;
  url?: string;
}

const DefaultMetaComponent: FunctionComponent<PropsType> = ({ title, description, url }) => {
  return (
    <Head>
      <title key="default-title-tag">{title}</title>
      <meta key="default-title-meta" name="title" content={title} />
      <meta key="default-description-meta" name="description" content={description} />
      {url && <link key="default-canonical-link" rel="canonical" href={url} />}
      <meta key="default-viewport-meta" name="viewport" content="width=device-width, initial-scale=1" />
      <meta key="default-robots-meta" name="robots" content="index, follow" />
      <meta key="default-charset-meta" charSet="UTF-8" />
    </Head>
  );
};

export default React.memo(DefaultMetaComponent);
