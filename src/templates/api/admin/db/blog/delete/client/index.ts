import type { BlogDeleteResponse } from "../types";
import type { SchemaType } from "../validation";

async function handler(body: SchemaType) {
  const response = await fetch("/api/admin/db/blog/delete/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as BlogDeleteResponse;
}

export default handler;
