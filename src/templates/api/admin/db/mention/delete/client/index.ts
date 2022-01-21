import type { LocationDeleteResponse } from "../types";
import type { MentionSchemaType } from "../validation";

async function handler(body: MentionSchemaType) {
  const response = await fetch("/api/admin/db/mention/delete/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as LocationDeleteResponse;
}

export default handler;
