//node_modules
import isString from "lodash/isString";

//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";

//locals
import getTestimonial from "./get-testimonial";

//types
import type { PageProps } from "../types";

const handler = createServerSideHandler<PageProps>();

handler.use(LoginRedirectMiddleware);

const getServerSideProps = handler.run(async (context) => {
  const key = context.query.key;
  if (isString(key)) {
    const testimonial = await getTestimonial(key);
    if (testimonial) {
      return {
        props: {
          testimonial: testimonial,
        },
      };
    }
  }
  return {
    notFound: true,
  };
});

export default getServerSideProps;
