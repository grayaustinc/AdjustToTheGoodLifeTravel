import type { InferResponse } from "libs/errors/next-connect-handler";
import type { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";

export interface ResponseType {
  ok: true;
  testimonial: TestimonialDocumentData;
}

export type TestimonialUpsertResponse = InferResponse<ResponseType>;
