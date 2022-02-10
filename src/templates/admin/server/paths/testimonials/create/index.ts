//node_modules
import isString from "lodash/isString";

//libs
import { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

//router
import { PathHandler } from "libs/ssr-router";

//helpers
import getTestimonial from "./get-testimonial";

export interface PageProps {
  testimonial?: TestimonialDocumentData;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const key = slug[0];
  if (isString(key)) {
    const testimonial = await getTestimonial(key);
    if (testimonial) {
      return context.props({
        testimonial: testimonial,
      });
    }
    return context.notFound();
  }
  return context.props({});
};

export default handler;
