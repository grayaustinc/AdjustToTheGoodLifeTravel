import type { InferResponse } from "libs/errors/next-connect-handler";
import type { PutObjectOutput } from "aws-sdk/clients/s3";

export interface ResponseType {
  ok: true;
  staticSrc: string;
  info: PutObjectOutput;
}

export type UploadImageResponse = InferResponse<ResponseType>;
