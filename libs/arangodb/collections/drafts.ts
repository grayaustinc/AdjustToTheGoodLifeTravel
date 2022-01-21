import type { DocumentCollection } from "arangojs/collection";
import type { DocumentMetadata } from "arangojs/documents";
import { RawDraftContentState } from "draft-js";
import database from "libs/arangodb";

export interface DraftDocumentData extends DocumentMetadata {
  blog_id: string;
  modified_time: number;
  content: RawDraftContentState;
}

const collection: DocumentCollection<DraftDocumentData> = database.collection("drafts");

collection.ensureIndex({
  type: "persistent",
  name: "blog_id-index",
  fields: ["blog_id"],
  estimates: true,
  inBackground: false,
  sparse: false,
  unique: false,
});

collection.ensureIndex({
  type: "persistent",
  name: "blog_id_modified_time-index",
  fields: ["blog_id", "modified_time"],
  estimates: true,
  inBackground: false,
  sparse: false,
  unique: false,
});

export default collection;
