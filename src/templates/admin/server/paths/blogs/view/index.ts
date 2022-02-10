//router
import { PathHandler } from "libs/ssr-router";

//libs
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";
import getPageNumber from "libs/helper/get-page-number";

//helpers
import getBlogs from "./get-blogs";
import getTotal from "./get-total";

export interface PageProps {
  blogs: BlogDocumentData[];
  page: number;
  total: number;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const page = getPageNumber(slug[0]);
  const [blogs, total] = await Promise.all([getBlogs(page), getTotal()]);
  return context.props({
    blogs: blogs,
    page: page,
    total: total,
  });
};

export default handler;
