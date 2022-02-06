//node_modules
import React, { FunctionComponent } from "react";
import NextImage from "next/image";

//helpers
import getStaticUrl from "libs/helper/get-static-url";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes(256, 256, 256, 256, 256, 256);

interface ImageModalBodySrcProps {
  src: string;
  onClick: () => void;
}

const ImageThumbnailComponent: FunctionComponent<ImageModalBodySrcProps> = ({ src, onClick }) => {
  return <NextImage src={getStaticUrl(src, false)} sizes={sizes} width="100%" height="100%" quality={1} onClick={onClick} objectFit="contain" />;
};

export default React.memo(ImageThumbnailComponent);
