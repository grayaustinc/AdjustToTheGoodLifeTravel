//import node_modules
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Col } from "react-bootstrap";

//helpers
import getImageSrcHelper from "libs/helper/get-image-src";
import isUnoptimized from "libs/helper/get-is-unoptimized";

//types
import type { ModifiedBlogDocumentData } from "src/templates/blogs/[page]/types";

//image
import preview from "src/images/62264e5b72ccfb0df23fc12c40abc3f6.png";

//styles
import style from "./image.module.scss";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes(640, 640, 640, 384, 384, 640);

interface BlogPreviewProps {
  blog: ModifiedBlogDocumentData;
  order: number;
  index: number;
}

function getClassName(index: number, loading: boolean) {
  if (loading) {
    return style["image-loading"];
  }
  return style["image-loading-complete"];
}

function getLoading(index: number): "eager" | "lazy" | undefined {
  if (index === 0) return undefined;
  return "lazy";
}

const ImageComponent: FunctionComponent<BlogPreviewProps> = ({ blog, index, order }) => {
  const src = getImageSrcHelper(blog.image);
  const [loading, setLoading] = useState(true);

  return (
    <Col className="d-flex" xs={{ order: 1, span: 12 }} lg={{ order: order, span: 5 }}>
      <Link href={`/blog/${blog.slug}`} passHref>
        <a className={style["image"]}>
          <NextImage
            src={src || preview}
            alt={blog.title}
            className={getClassName(index, loading)}
            sizes={sizes}
            quality={30}
            priority={index === 0}
            loading={getLoading(index)}
            layout="fill"
            objectFit="cover"
            lazyBoundary="362px"
            unoptimized={isUnoptimized(blog.image)}
            onLoadingComplete={() => setLoading(false)}
          />
        </a>
      </Link>
    </Col>
  );
};

export default React.memo(ImageComponent);
