import type { TestimonialDeleteResponse } from "../types";
import type { TestimonialSchemaType } from "../validation";

async function handler(body: TestimonialSchemaType) {
  const response = await fetch("/api/admin/db/testimonial/delete/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as TestimonialDeleteResponse;
}

export default handler;
