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
import PreviewImageData from "./preview.png";

//styles
import style from "../blog.module.scss";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes(640, 640, 640, 384, 384, 640);

interface BlogPreviewProps {
  blog: ModifiedBlogDocumentData;
  order: number;
  index: number;
}

const ImageComponent: FunctionComponent<BlogPreviewProps> = ({ blog, index, order }) => {
  const src = getImageSrcHelper(blog.image);

  return (
    <Col className={style["block"]} xs={{ order: 1, span: 12 }} lg={{ order: order, span: 5 }}>
      <Link href={`/blog/${blog.slug}`} passHref>
        <a className={style["image"]}>
          <NextImage
            src={src || PreviewImageData}
            alt={blog.title}
            sizes={sizes}
            quality={30}
            priority={index === 0}
            layout="fill"
            objectFit="cover"
            unoptimized={isUnoptimized(blog.image)}
          />
        </a>
      </Link>
    </Col>
  );
};

export default React.memo(ImageComponent);
