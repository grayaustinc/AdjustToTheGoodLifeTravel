import type { LogoutResponse } from "../types";

async function handler() {
  const response = await fetch("/api/admin/logout/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
  });
  const data = await response.json();
  return data as LogoutResponse;
}

export default handler;
