import type { InferResponse } from "libs/errors/next-connect-handler";
import type { LocationDocumentData } from "libs/arangodb/collections/locations";

export interface ResponseType {
  ok: true;
  location: LocationDocumentData;
}

export type LocationUpsertResponse = InferResponse<ResponseType>;
