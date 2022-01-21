import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

export const TOTAL_BLOGS_PER_PAGE = 10;

export const BlogKeys = ["title", "description", "slug", "image", "published_time"] as const;
export type ModifiedBlogDocumentData = Pick<BlogDocumentData, typeof BlogKeys[number]>;

export interface PageProps {
  blogs: ModifiedBlogDocumentData[];
  page: number;
  total: number;
}
