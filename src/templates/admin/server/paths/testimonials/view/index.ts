//router
import { PathHandler } from "libs/ssr-router";

//libs
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import getPageNumber from "libs/helper/get-page-number";

//helpers
import getTestimonials from "./get-testimonials";
import getTotal from "./get-total";

export interface PageProps {
  testimonials: TestimonialDocumentData[];
  page: number;
  total: number;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const page = getPageNumber(slug[0]);
  if (page > 0) {
    const [testimonials, total] = await Promise.all([getTestimonials(page), getTotal()]);
    return context.props({
      testimonials: testimonials,
      page: page,
      total: total,
    });
  }
  return context.notFound();
};

export default handler;
