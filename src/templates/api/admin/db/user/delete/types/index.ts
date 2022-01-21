import type { InferResponse } from "libs/errors/next-connect-handler";
import type { UserDocumentData } from "libs/arangodb/collections/users";

export interface ResponseType {
  ok: true;
  user: UserDocumentData;
}

export type LocationDeleteResponse = InferResponse<ResponseType>;
