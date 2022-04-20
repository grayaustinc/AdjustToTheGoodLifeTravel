//import node_modules
import React, { FunctionComponent } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { Col } from "react-bootstrap";

//helpers
import getImageSrcHelper from "libs/helper/get-image-src";
import getImageLoaderSrc from "libs/helper/get-image-loader-absolute-src";
import isUnoptimized from "libs/helper/get-is-unoptimized";

//types
import type { ModifiedBlogDocumentData } from "src/templates/blogs/[page]/types";

//image
import preview from "src/images/62264e5b72ccfb0df23fc12c40abc3f6.png";

//styles
import style from "./image.module.scss";

import getBootstrapSizes from "libs/helper/get-bootstrap-sizes";
const sizes = getBootstrapSizes({ xs: 640, lg: 384, xxl: 640 });

interface BlogPreviewProps {
  blog: ModifiedBlogDocumentData;
  order: number;
  index: number;
}

function getLoading(index: number): "eager" | "lazy" | undefined {
  if (index === 0) return undefined;
  return "lazy";
}

const ImageComponent: FunctionComponent<BlogPreviewProps> = ({ blog, index, order }) => {
  const src = getImageSrcHelper(blog.image);

  return (
    <Col className="d-flex" xs={{ order: 1, span: 12 }} lg={{ order: order, span: 5 }}>
      <Link href={`/blog/${blog.slug}`} passHref>
        <a className={style["wrapper"]}>
          <NextImage
            src={src || preview}
            alt={blog.title}
            className={style["image"]}
            sizes={sizes}
            quality={30}
            priority={index === 0}
            loading={getLoading(index)}
            layout="fill"
            objectFit="cover"
            blurDataURL={getImageLoaderSrc(src || preview.src, 64, 70)}
            placeholder="blur"
            lazyBoundary="362px"
            unoptimized={isUnoptimized(blog.image)}
          />
        </a>
      </Link>
    </Col>
  );
};

export default React.memo(ImageComponent);
