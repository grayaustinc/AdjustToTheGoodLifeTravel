import type { InferResponse } from "libs/errors/next-connect-handler";
import type { DraftDocumentData } from "libs/arangodb/collections/drafts";

export interface ResponseType {
  ok: true;
  draft: DraftDocumentData;
}

export type BlogSaveDraftResponse = InferResponse<ResponseType>;
