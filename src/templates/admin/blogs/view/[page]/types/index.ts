import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

export const TOTAL_BLOGS_PER_PAGE = 10;

export interface PageProps {
  blogs: BlogDocumentData[];
  page: number;
  total: number;
}
