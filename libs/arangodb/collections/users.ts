import type { DocumentCollection } from "arangojs/collection";
import type { DocumentMetadata } from "arangojs/documents";
import database from "libs/arangodb";

export interface UserDocumentData extends DocumentMetadata {
  username: string;
  password: string;
  role: string;
}

const collection: DocumentCollection<UserDocumentData> = database.collection("users");

collection.ensureIndex({
  type: "persistent",
  name: "username-index",
  fields: ["username"],
  estimates: true,
  inBackground: false,
  sparse: false,
  unique: true,
});

export default collection;
