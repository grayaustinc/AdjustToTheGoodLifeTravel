import React from "react";
import Head from "next/head";
import { FunctionComponent } from "react";

interface PropsType {}

const GoogleMetaComponent: FunctionComponent<PropsType> = () => {
  return (
    <Head>
      <meta key="google-googlebot-meta" name="googlebot" content="index, follow" />
    </Head>
  );
};

export default React.memo(GoogleMetaComponent);
