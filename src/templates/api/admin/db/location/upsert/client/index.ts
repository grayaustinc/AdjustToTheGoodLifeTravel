import type { LocationUpsertResponse } from "../types";
import type { LocationSchemaType } from "../validation";

async function handler(body: LocationSchemaType) {
  const response = await fetch("/api/admin/db/location/upsert/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as LocationUpsertResponse;
}

export default handler;
