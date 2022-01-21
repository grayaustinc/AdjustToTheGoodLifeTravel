import type { DocumentCollection } from "arangojs/collection";
import type { DocumentMetadata } from "arangojs/documents";
import database from "libs/arangodb";

export interface ImageType {
  src: string;
  srcType: "STATIC" | "EXTERNAL";
  quality: number;
  alt: string;
}

export interface MentionDocumentData extends DocumentMetadata {
  title: string;
  image: ImageType;
  url: string;
  published_time: number;
}

const collection: DocumentCollection<MentionDocumentData> = database.collection("mentions");

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
