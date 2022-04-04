//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";

//helpers
import getTestimonials from "./get-testimonials";
import type { PageProps } from "../types";

const handler = crateGetStaticHandler<PageProps>();

handler.use(ErrorWrapperMiddleware);

export const getStaticProps = handler.run(async (context) => {
  const testimonials = await getTestimonials(8);
  return {
    props: {
      testimonials: testimonials,
    },
    revalidate: 300,
  };
});

export default getStaticProps;
