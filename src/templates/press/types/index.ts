import { MentionDocumentData } from "libs/arangodb/collections/mentions";

export interface PageProps {
  mentions: MentionDocumentData[];
}
