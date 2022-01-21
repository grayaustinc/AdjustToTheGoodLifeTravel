import type { DocumentCollection } from "arangojs/collection";
import type { DocumentMetadata } from "arangojs/documents";
import database from "libs/arangodb";

export interface TestimonialDocumentData extends DocumentMetadata {
  title: string;
  rating: number;
  description: string;
  reviewer: string;
  locations: string;
}

const collection: DocumentCollection<TestimonialDocumentData> = database.collection("testimonials");

collection.ensureIndex({
  type: "persistent",
  name: "rating-index",
  fields: ["rating"],
  estimates: true,
  inBackground: false,
  sparse: false,
  unique: false,
});

export default collection;
