import type { LocationUpsertResponse } from "../types";
import type { ChangePasswordSchemaType } from "../validation";

async function handler(body: ChangePasswordSchemaType) {
  const response = await fetch("/api/admin/account/change-password/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as LocationUpsertResponse;
}

export default handler;
