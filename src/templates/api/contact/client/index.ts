import type { ContactResponse } from "../types";
import type { ContactSchemaType } from "../validation";

async function handler(body: ContactSchemaType) {
  const response = await fetch("/api/contact/", {
    method: "POST",
    cache: "no-cache",
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data as ContactResponse;
}

export default handler;
