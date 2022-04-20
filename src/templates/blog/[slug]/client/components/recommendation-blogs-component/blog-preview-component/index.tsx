//import node_modules
import React, { FunctionComponent, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

//helpers
import getImageSrcHelper from "libs/helper/get-image-src";
import getImageLoaderSrc from "libs/helper/get-image-loader-absolute-src";
import isUnoptimized from "libs/helper/get-is-unoptimized";

//types
import type { RecommendationBlogDocumentData } from "src/templates/blog/[slug]/types";

//image
import preview from "src/images/62264e5b72ccfb0df23fc12c40abc3f6.png";

//styles
import style from "./preview.module.scss";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes({ xs: 384, md: 256, xxl: 384 });

interface BlogPreviewProps {
  recommendation: RecommendationBlogDocumentData;
}

const BlogPreviewComponent: FunctionComponent<BlogPreviewProps> = ({ recommendation }) => {
  const src = getImageSrcHelper(recommendation.image);
  const href = `/blog/${recommendation.slug}`;

  return (
    <div className={style["container"]}>
      <Link href={href} passHref>
        <a className={style["wrapper"]}>
          <NextImage
            src={src || preview}
            alt={recommendation.title}
            className={style["image"]}
            sizes={sizes}
            quality={30}
            loading="lazy"
            layout="fill"
            objectFit="cover"
            blurDataURL={getImageLoaderSrc(src || preview.src, 64, 70)}
            placeholder="blur"
            lazyBoundary="272px"
            unoptimized={isUnoptimized(recommendation.image)}
          />
        </a>
      </Link>
      <Link href={href} passHref>
        <a className={style["clickable"]}>
          <p className="h2">{recommendation.title}</p>
        </a>
      </Link>
      <p className="h4">{recommendation.description}</p>
    </div>
  );
};

export default React.memo(BlogPreviewComponent);
