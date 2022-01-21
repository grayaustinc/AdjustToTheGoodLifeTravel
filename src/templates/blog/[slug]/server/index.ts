//node_modules
import isString from "lodash/isString";

//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";

//api
import getBlog from "./get-blog";
import getRecommendation from "./get-recommendations";

//types
import type { PageProps } from "../types";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const handler = crateGetStaticHandler<PageProps>();

handler.use(ErrorWrapperMiddleware);

export const getStaticProps = handler.run(async (context) => {
  const slug = context.params?.["slug"];
  if (slug && isString(slug)) {
    const [blog, recommendations] = await Promise.all([getBlog(slug), getRecommendation(slug)]);
    if (blog) {
      return {
        props: {
          blog: blog,
          recommendations: recommendations,
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
