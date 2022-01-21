import type { UserDocumentData } from "libs/arangodb/collections/users";

export const TOTAL_USERS_PER_PAGE = 10;

export interface PageProps {
  users: UserDocumentData[];
  page: number;
  total: number;
}
