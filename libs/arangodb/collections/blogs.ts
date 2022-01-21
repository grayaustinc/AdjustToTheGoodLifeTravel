import type { DocumentCollection } from "arangojs/collection";
import type { DocumentMetadata } from "arangojs/documents";
import type { RawDraftContentState } from "draft-js";
import database from "libs/arangodb";

export interface ImageType {
  src: string;
  srcType: "STATIC" | "EXTERNAL";
}

export interface BlogDocumentData extends DocumentMetadata {
  slug: string;
  authors: string[];
  image: null | ImageType;
  title: string;
  description: string;
  published: boolean;
  published_time: number;
  modified_time: number;
  content: RawDraftContentState;
}

const collection: DocumentCollection<BlogDocumentData> = database.collection("blogs");

collection.ensureIndex({
  type: "persistent",
  name: "slug-index",
  fields: ["slug"],
  estimates: true,
  inBackground: false,
  sparse: true,
  unique: true,
});

collection.ensureIndex({
  type: "persistent",
  name: "published-index",
  fields: ["published"],
  estimates: true,
  inBackground: false,
  sparse: true,
  unique: false,
});

collection.ensureIndex({
  type: "persistent",
  name: "published_time-index",
  fields: ["published_time"],
  estimates: true,
  inBackground: false,
  sparse: true,
  unique: false,
});

export default collection;
