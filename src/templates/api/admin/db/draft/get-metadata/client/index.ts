import type { GetDraftsMetadataResponse } from "../types";
import type { GetDraftsMetadataSchemaType } from "../validation";

async function handler(body: GetDraftsMetadataSchemaType) {
  const response = await fetch("/api/admin/db/draft/get-metadata/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as GetDraftsMetadataResponse;
}

export default handler;
