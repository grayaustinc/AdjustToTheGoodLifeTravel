import type { TestimonialUpsertResponse } from "../types";
import type { TestimonialSchemaType } from "../validation";

async function handler(body: TestimonialSchemaType) {
  const response = await fetch("/api/admin/db/testimonial/upsert/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as TestimonialUpsertResponse;
}

export default handler;
