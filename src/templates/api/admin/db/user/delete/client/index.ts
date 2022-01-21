import type { LocationDeleteResponse } from "../types";
import type { UserSchemaType } from "../validation";

async function handler(body: UserSchemaType) {
  const response = await fetch("/api/admin/db/user/delete/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as LocationDeleteResponse;
}

export default handler;
