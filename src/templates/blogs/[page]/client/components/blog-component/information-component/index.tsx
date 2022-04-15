//import node_modules
import React, { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import format from "date-fns/format";
import { Col, Button } from "react-bootstrap";

//types
import type { ModifiedBlogDocumentData } from "src/templates/blogs/[page]/types";

//styles
import style from "../blog.module.scss";

interface BlogPreviewProps {
  blog: ModifiedBlogDocumentData;
  order: number;
}

const InformationComponent: FunctionComponent<BlogPreviewProps> = ({ blog, order }) => {
  return (
    <Col className={style["block"]} xs={{ order: 2, span: 12 }} lg={{ order: order, span: 4 }}>
      <div className={style["container"]}>
        <Link href={`/blog/${blog.slug}`} passHref>
          <a className={style["clickable"]}>
            <p className="h2 mb-3">{blog.title}</p>
          </a>
        </Link>
        <div className="h5">{format(blog.published_time, "PPP")}</div>
        <p className="h4">{blog.description}</p>
        <div className="my-auto" />
        <div>
          <Link href={`/blog/${blog.slug}`} passHref>
            <Button variant="outline-primary" size="lg">
              READ THE POST
            </Button>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default React.memo(InformationComponent);
