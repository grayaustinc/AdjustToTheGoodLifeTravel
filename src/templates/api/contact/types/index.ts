import type { InferResponse } from "libs/errors/next-connect-handler";

export interface ResponseType {
  ok: true;
}

export type ContactResponse = InferResponse<ResponseType>;
