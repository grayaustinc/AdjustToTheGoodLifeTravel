//node_modules
import React from "react";
import { NextComponentType } from "next";

import type { PageProps } from "../types";

//layout
import SiteLayout from "src/layouts/site-layout";

//locals
import BlogComponent from "./components/blog-component";
import PagingComponent from "./components/router-component";
import MetaComponent from "./meta";

const BlogsListPage: NextComponentType<any, any, PageProps> = ({ page, total, blogs }) => {
  return (
    <SiteLayout>
      <MetaComponent />
      <BlogComponent blogs={blogs} />
      <PagingComponent page={page} total={total} />
    </SiteLayout>
  );
};

export default BlogsListPage;
