import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

export const TOTAL_TESTIMONIALS_PER_PAGE = 10;

export interface PageProps {
  testimonials: TestimonialDocumentData[];
  page: number;
  total: number;
}
