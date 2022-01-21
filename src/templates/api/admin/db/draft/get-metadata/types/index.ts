import type { InferResponse } from "libs/errors/next-connect-handler";
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";

export const DraftKeys = ["_key", "_id", "_rev", "modified_time"] as const;
export type DraftMetadata = Pick<DraftDocumentData, typeof DraftKeys[number]>;

export interface ResponseType {
  ok: true;
  drafts: DraftMetadata[];
}

export type GetDraftsMetadataResponse = InferResponse<ResponseType>;
