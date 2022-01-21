import { BlogDocumentData } from "libs/arangodb/collections/blogs";
import { DraftDocumentData } from "libs/arangodb/collections/drafts";

export interface PageProps {
  blog: BlogDocumentData;
  draft: DraftDocumentData;
}
