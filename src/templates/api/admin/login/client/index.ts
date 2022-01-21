import type { LoginResponse } from "../types";
import type { LoginSchemaType } from "../validation";

async function handler(body: LoginSchemaType) {
  const response = await fetch("/api/admin/login/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as LoginResponse;
}

export default handler;
