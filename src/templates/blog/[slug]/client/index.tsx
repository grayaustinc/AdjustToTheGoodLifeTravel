//import node_modules
import React, { useMemo } from "react";
import { NextComponentType } from "next";
import readingTime from "reading-time";
import { convertFromRaw } from "draft-js";
import formatDistanceToNow from "date-fns/formatDistanceToNowStrict";
import format from "date-fns/format";

import type { PageProps } from "../types";

//import components
import HeaderComponent from "src/components/header-component";
import FooterComponent from "src/components/footer-component";

//meta
import MetaComponent from "./meta";

//blog rendering
import BlogContainerComponent from "src/components/blog-container-component";
import BlogRenderComponent, { createReadonlyState } from "src/components/draft-component/readonly";

//locals
import ShareLinksComponent from "./share-links-component";
import RecommendationBlogsComponent from "./recommendation-blogs-component";

const BlogPage: NextComponentType<any, any, PageProps> = ({ blog, recommendations }) => {
  const reading = useMemo(() => readingTime(blog.content.blocks.reduce((text, block) => text + " " + block.text, "")), [blog.content]);
  const editorState = useMemo(() => createReadonlyState(convertFromRaw(blog.content)), [blog.content]);

  return (
    <>
      <MetaComponent title={blog.title} description={blog.description} image={blog.image} published_time={blog.published_time} modified_time={blog.modified_time} />
      <HeaderComponent />
      <BlogContainerComponent>
        <div className="h4">
          <span>By </span>
          <span>{blog.authors.join(", ")}</span>
        </div>
        <div>
          <small>
            <span>Published </span>
            <span>
              {format(blog.published_time, "PPP")} ({formatDistanceToNow(blog.published_time, { addSuffix: true })})
            </span>
            <span> • </span>
            <span>{reading.text}</span>
          </small>
        </div>
        <BlogRenderComponent editorState={editorState} setEditorState={() => {}} />
        <ShareLinksComponent title={blog.title} description={blog.description} slug={blog.slug} image={blog.image} />
      </BlogContainerComponent>
      <RecommendationBlogsComponent recommendations={recommendations} />
      <div className="my-auto" />
      <FooterComponent />
    </>
  );
};

export default BlogPage;
