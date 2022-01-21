import type { BlogCreateDraftResponse } from "../types";
import type { DraftCreateSchemaType } from "../validation";

async function handler(body: DraftCreateSchemaType) {
  const response = await fetch("/api/admin/db/draft/create/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as BlogCreateDraftResponse;
}

export default handler;
