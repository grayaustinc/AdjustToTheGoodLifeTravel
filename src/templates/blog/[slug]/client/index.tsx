//import node_modules
import React, { useMemo } from "react";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import readingTime from "reading-time";
import { convertFromRaw } from "draft-js";

import type { PageProps } from "../types";

//layout
import SiteLayout from "src/layouts/site-layout";

//meta
import MetaComponent from "./meta";

//blog rendering
import BlogContainerComponent from "src/components/blog-container-component";
import BlogRenderComponent, { createReadonlyState } from "src/components/draft-component/readonly";

//locals
import ShareLinksComponent from "./components/share-links-component";
import RecommendationBlogsComponent from "./components/recommendation-blogs-component";

//locals dynamic
const PublishedComponent = dynamic(() => import("./components/published-component"), { ssr: false });

const BlogPage: NextPage<PageProps> = ({ blog, recommendations }) => {
  const read_time = useMemo(() => readingTime(blog.content.blocks.reduce((text, block) => text + " " + block.text, "")), [blog.content]);
  const editorState = useMemo(() => createReadonlyState(convertFromRaw(blog.content)), [blog.content]);

  return (
    <SiteLayout>
      <MetaComponent title={blog.title} description={blog.description} image={blog.image} published_time={blog.published_time} modified_time={blog.modified_time} />
      <BlogContainerComponent>
        <div className="h4">
          <span>By </span>
          <span>{blog.authors.join(", ")}</span>
        </div>
        <PublishedComponent published_time={blog.published_time} read_time={read_time} />
        <BlogRenderComponent editorState={editorState} setEditorState={() => {}} />
      </BlogContainerComponent>
      <ShareLinksComponent title={blog.title} description={blog.description} slug={blog.slug} image={blog.image} />
      <RecommendationBlogsComponent recommendations={recommendations} />
    </SiteLayout>
  );
};

export default React.memo(BlogPage);
