//node_modules
import React, { FunctionComponent, useState } from "react";
import NextImage from "next/image";
import { ImageDataType } from "src/modals/image/validation";

//helpers
import isUnoptimized from "libs/helper/get-is-unoptimized";
import getImageSrc from "libs/helper/get-image-src";
import getImageLoaderSrc from "libs/helper/get-image-loader-absolute-src";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const defaultSizes = getBootstrapSizes({ xs: 640, md: 750 });

import styles from "./image.module.scss";

interface ImageProps {
  onClick?: () => void;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  data: ImageDataType;
  priority?: boolean;
  sizes?: string;
}

const ImageComponent: FunctionComponent<ImageProps> = ({ data, priority, sizes, onClick, onLoad }) => {
  const src = getImageSrc(data);

  if (!src) {
    return <div>Cannot display Image</div>;
  }

  return (
    <div className={styles["container"]}>
      <NextImage
        src={src}
        alt={data?.alt}
        onClick={onClick}
        onLoad={onLoad}
        className={styles["base"]}
        sizes={sizes || defaultSizes}
        quality={data.quality || 30}
        priority={priority}
        blurDataURL={getImageLoaderSrc(src, 64, 70)}
        placeholder="blur"
        layout="fill"
        objectFit="contain"
        unoptimized={isUnoptimized(data)}
      />
    </div>
  );
};

ImageComponent.defaultProps = {
  priority: false,
};

export default React.memo(ImageComponent);
