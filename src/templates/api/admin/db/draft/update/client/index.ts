import type { BlogSaveDraftResponse } from "../types";
import type { DraftCreateSchemaType } from "../validation";

async function handler(body: DraftCreateSchemaType) {
  const response = await fetch("/api/admin/db/draft/update/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as BlogSaveDraftResponse;
}

export default handler;
