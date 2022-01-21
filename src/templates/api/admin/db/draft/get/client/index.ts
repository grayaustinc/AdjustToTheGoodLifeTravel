import type { GetDraftResponse } from "../types";
import type { GetDraftsMetadataSchemaType } from "../validation";

async function handler(body: GetDraftsMetadataSchemaType) {
  const response = await fetch("/api/admin/db/draft/get/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as GetDraftResponse;
}

export default handler;
