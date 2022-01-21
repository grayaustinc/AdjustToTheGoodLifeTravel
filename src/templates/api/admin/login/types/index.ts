import type { InferResponse } from "libs/errors/next-connect-handler";

export interface ResponseType {
  ok: true;
}

export type LoginResponse = InferResponse<ResponseType>;
