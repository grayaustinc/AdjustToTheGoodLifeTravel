//import node_modules
import React, { FunctionComponent } from "react";
import Link from "next/link";
import NextImage from "next/image";

//helpers
import getImageSrcHelper from "libs/helper/get-image-src";
import isUnoptimized from "libs/helper/get-is-unoptimized";

//types
import type { RecommendationBlogDocumentData } from "src/templates/blog/[slug]/types";

//image
import PreviewImageData from "./preview.png";

//styles
import style from "src/templates/blog/[slug]/client/blog.module.scss";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes(384, 384, 256, 256, 256, 384);

interface BlogPreviewProps {
  recommendation: RecommendationBlogDocumentData;
}

const BlogPreviewComponent: FunctionComponent<BlogPreviewProps> = ({ recommendation }) => {
  const src = getImageSrcHelper(recommendation.image);

  const href = `/blog/${recommendation.slug}`;

  return (
    <div className={style["container"]}>
      <Link href={href} passHref>
        <a className={style["image"]}>
          <NextImage
            src={src || PreviewImageData}
            alt={recommendation.title}
            sizes={sizes}
            quality={30}
            layout="fill"
            objectFit="cover"
            unoptimized={isUnoptimized(recommendation.image)}
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
