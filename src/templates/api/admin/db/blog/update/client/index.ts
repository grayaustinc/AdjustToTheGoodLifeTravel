import type { BlogSaveResponse } from "../types";
import type { BlogSchemaType } from "../validation";

async function handler(body: BlogSchemaType) {
  const response = await fetch("/api/admin/db/blog/update/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as BlogSaveResponse;
}

export default handler;
