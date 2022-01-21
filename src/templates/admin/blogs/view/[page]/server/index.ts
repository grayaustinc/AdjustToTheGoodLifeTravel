//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";
import getPageNumber from "libs/helper/get-page-number";

//helpers
import getBlogs from "./get-blogs";
import getTotal from "./get-total";

//types
import { PageProps } from "../types";

const handler = createServerSideHandler<PageProps>();

handler.use(LoginRedirectMiddleware);

const getServerSideProps = handler.run(async (context) => {
  const page = getPageNumber(context.params?.page);
  const [blogs, total] = await Promise.all([getBlogs(page), getTotal()]);
  return {
    props: {
      blogs: blogs,
      page: page,
      total: total,
    },
  };
});

export default getServerSideProps;
