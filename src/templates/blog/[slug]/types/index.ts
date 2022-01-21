import type { BlogDocumentData } from "libs/arangodb/collections/blogs";

export const ModifiedBlogKeys = ["authors", "content", "description", "image", "slug", "modified_time", "published_time", "title"] as const;
export type ModifiedBlogDocumentData = Pick<BlogDocumentData, typeof ModifiedBlogKeys[number]>;

export const RecommendationBlogKeys = ["title", "description", "slug", "image"] as const;
export type RecommendationBlogDocumentData = Pick<BlogDocumentData, typeof RecommendationBlogKeys[number]>;

export interface PageProps {
  blog: ModifiedBlogDocumentData;
  recommendations: RecommendationBlogDocumentData[];
}
