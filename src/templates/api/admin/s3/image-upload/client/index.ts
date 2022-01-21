import { UploadImageResponse } from "../types";
import { UploadImageBodyType } from "../validation";

async function handler(body: UploadImageBodyType) {
  const response = await fetch("/api/admin/s3/image-upload/", {
    method: "POST",
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return data as UploadImageResponse;
}

export default handler;
