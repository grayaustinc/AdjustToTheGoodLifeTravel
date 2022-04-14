//import node_modules
import React, { FunctionComponent, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

//helpers
import getImageSrcHelper from "libs/helper/get-image-src";
import isUnoptimized from "libs/helper/get-is-unoptimized";

//types
import type { RecommendationBlogDocumentData } from "src/templates/blog/[slug]/types";

//image
import preview from "src/images/62264e5b72ccfb0df23fc12c40abc3f6.png";

//styles
import style from "./preview.module.scss";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes(384, 384, 256, 256, 256, 384);

interface BlogPreviewProps {
  recommendation: RecommendationBlogDocumentData;
}

function getClassName(loading: boolean) {
  if (loading) {
    return style["image-loading"];
  }
  return style["image-loading-complete"];
}

const BlogPreviewComponent: FunctionComponent<BlogPreviewProps> = ({ recommendation }) => {
  const src = getImageSrcHelper(recommendation.image);
  const href = `/blog/${recommendation.slug}`;
  const [loading, setLoading] = useState(true);

  return (
    <div className={style["container"]}>
      <Link href={href} passHref>
        <a className={style["image"]}>
          <NextImage
            src={src || preview}
            alt={recommendation.title}
            className={getClassName(loading)}
            sizes={sizes}
            quality={30}
            loading="lazy"
            layout="fill"
            objectFit="cover"
            lazyBoundary="272px"
            unoptimized={isUnoptimized(recommendation.image)}
            onLoadingComplete={() => setLoading(false)}
          />
        </a>
      </Link>
      <Link href={href} passHref>
        <a className={style["clickable"]}>
          <h1 className="h2">{recommendation.title}</h1>
        </a>
      </Link>
      <h2 className="h4">{recommendation.description}</h2>
    </div>
  );
};

export default React.memo(BlogPreviewComponent);
