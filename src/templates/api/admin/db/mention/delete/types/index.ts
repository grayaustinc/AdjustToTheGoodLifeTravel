import type { InferResponse } from "libs/errors/next-connect-handler";
import type { MentionDocumentData } from "libs/arangodb/collections/mentions";

export interface ResponseType {
  ok: true;
  mention: MentionDocumentData;
}

export type LocationDeleteResponse = InferResponse<ResponseType>;
