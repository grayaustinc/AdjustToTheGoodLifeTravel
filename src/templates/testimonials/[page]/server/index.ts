//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";
import getPageNumber from "libs/helper/get-page-number";

//api
import getTestimonials from "./get-testimonials";
import getTotal from "./get-total";

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
  const page = getPageNumber(context.params?.page);
  if (page > 0) {
    const [testimonials, total] = await Promise.all([getTestimonials(page), getTotal()]);
    if (testimonials.length > 0) {
      return {
        props: {
          testimonials: testimonials,
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
