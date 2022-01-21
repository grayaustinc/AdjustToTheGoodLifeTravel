import type { DraftDeleteResponse } from "../types";
import type { SchemaType } from "../validation";

async function handler(body: SchemaType) {
  const response = await fetch("/api/admin/db/draft/delete/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as DraftDeleteResponse;
}

export default handler;
