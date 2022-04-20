//node_modules
import React, { FunctionComponent } from "react";
import NextImage from "next/image";

//helpers
import isUnoptimized from "libs/helper/get-is-unoptimized";
import getImageSrc from "libs/helper/get-image-src";

//libs
import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes({ xs: 256 });

interface ImagePreviewProps {
  src: string;
  srcType: string;
}

const ImagePreviewComponent: FunctionComponent<ImagePreviewProps> = (props) => {
  const src = getImageSrc(props);

  if (!src) {
    return <div>Cannot display Preview</div>;
  }

  return <NextImage src={src} sizes={sizes} width="100%" height="100%" quality={1} objectFit="contain" unoptimized={isUnoptimized(props)} />;
};

export default React.memo(ImagePreviewComponent);
