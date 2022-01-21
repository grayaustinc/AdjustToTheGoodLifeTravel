import type { DocumentCollection } from "arangojs/collection";
import type { DocumentMetadata } from "arangojs/documents";
import type { SessionData } from "next-session/lib/types";
import database from "libs/arangodb";

export interface SessionDocumentData extends DocumentMetadata {
  ttl: number;
  data: SessionData;
}

const collection: DocumentCollection<SessionDocumentData> = database.collection("sessions");

collection.ensureIndex({
  type: "ttl",
  name: "ttl-index",
  fields: ["ttl"],
  expireAfter: 0,
  inBackground: false,
});

export default collection;
