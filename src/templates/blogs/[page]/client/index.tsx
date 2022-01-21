//node_modules
import React from "react";
import { NextComponentType } from "next";
import Link from "next/link";
import NextImage from "next/image";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";

import type { PageProps } from "../types";

//components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//locals
import BlogComponent from "./components/blog-component";
import PagingComponent from "./components/router-component";
import MetaComponent from "./meta";

const BlogsListPage: NextComponentType<any, any, PageProps> = ({ page, total, blogs }) => {
  return (
    <>
      <MetaComponent />
      <HeaderComponent />
      <BlogComponent blogs={blogs} />
      <PagingComponent page={page} total={total} />
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default BlogsListPage;
