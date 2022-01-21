//node_modules
import React, { FunctionComponent } from "react";
import NextImage from "next/image";
import { ImageDataType } from "src/modals/image/validation";

//helpers
import isUnoptimized from "libs/helper/get-is-unoptimized";
import getImageSrc from "libs/helper/get-image-src";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const defaultSizes = getBootstrapSizes(640, 640, 750, 750, 750, 750);

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
    <div className={styles["image-container"]}>
      <NextImage
        src={src}
        alt={data?.alt}
        onClick={onClick}
        onLoad={onLoad}
        className={styles["image"]}
        sizes={sizes || defaultSizes}
        quality={data.quality || 30}
        priority={priority}
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
