import type { DocumentCollection } from "arangojs/collection";
import type { DocumentMetadata } from "arangojs/documents";
import database from "libs/arangodb";

export interface ImageType {
  src: string;
  srcType: "STATIC" | "EXTERNAL";
  quality: number | undefined;
  alt: string | undefined;
}

export interface LocationDocumentData extends DocumentMetadata {
  name: string;
  description: string;
  image: ImageType | null;
  coordinates: [number, number];
}

const collection: DocumentCollection<LocationDocumentData> = database.collection("locations");

export default collection;
