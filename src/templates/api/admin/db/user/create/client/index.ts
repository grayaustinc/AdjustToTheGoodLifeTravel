import type { LocationUpsertResponse } from "../types";
import type { UserSchemaType } from "../validation";

async function handler(body: UserSchemaType) {
  const response = await fetch("/api/admin/db/user/create/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as LocationUpsertResponse;
}

export default handler;
