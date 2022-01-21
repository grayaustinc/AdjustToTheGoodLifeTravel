import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

export interface PageProps {
  testimonials: TestimonialDocumentData[];
}
