import type { InferResponse } from "libs/errors/next-connect-handler";

export interface ResponseType {
  ok: true;
  data: string[];
  NextMarker?: string;
}

export type ListImageResponse = InferResponse<ResponseType>;
