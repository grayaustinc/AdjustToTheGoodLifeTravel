import type { MetascraperResponse } from "../types";
import type { MetascraperSchemaType } from "../validation";

async function handler(body: MetascraperSchemaType) {
  const response = await fetch("/api/admin/metascraper/get/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as MetascraperResponse;
}

export default handler;
