//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";
import getPageNumber from "libs/helper/get-page-number";

//api
import getBlogs from "./get-blogs";
import getTotal from "./get-total";

//types
import type { PageProps } from "src/templates/blogs/[page]/types";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const handler = crateGetStaticHandler<PageProps>();

handler.use(ErrorWrapperMiddleware);

export const getStaticProps = handler.run(async (context) => {
  const page = getPageNumber(context.params?.page);
  if (page > 0) {
    const [blogs, total] = await Promise.all([getBlogs(page), getTotal()]);
    if (blogs.length > 0) {
      return {
        props: {
          blogs: blogs,
          page: page,
          total: total,
        },
        revalidate: 300,
      };
    }
  }
  return {
    notFound: true,
    revalidate: 300,
  };
});

export default getStaticProps;
