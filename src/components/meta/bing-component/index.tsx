import React from "react";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PropsType {}

const BingMetaComponent: FunctionComponent<PropsType> = () => {
  return (
    <Head>
      <meta key="bing-bingbot" name="bingbot" content="index, follow" />
    </Head>
  );
};

export default React.memo(BingMetaComponent);
