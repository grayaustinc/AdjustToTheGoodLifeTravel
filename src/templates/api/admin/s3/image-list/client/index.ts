import { ListImageResponse } from "../types";
import { ListImageBodyType } from "../validation";

async function handler(body: ListImageBodyType) {
  const response = await fetch("/api/admin/s3/image-list/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data as ListImageResponse;
}

export default handler;
