import type { InferResponse } from "libs/errors/next-connect-handler";
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

export interface ResponseType {
  ok: true;
  blog: BlogDocumentData;
}

export type BlogSaveResponse = InferResponse<ResponseType>;
