import React from "react";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PropsType {}

const BingMetaComponent: FunctionComponent<PropsType> = () => {
  return (
    <Head>
      <meta key="default-robots-meta" name="robots" content="noindex" />
    </Head>
  );
};

export default React.memo(BingMetaComponent);
