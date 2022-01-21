import type { MentionDocumentData } from "libs/arangodb/collections/mentions";

export const TOTAL_MENTIONS_PER_PAGE = 10;

export interface PageProps {
  mentions: MentionDocumentData[];
  page: number;
  total: number;
}
