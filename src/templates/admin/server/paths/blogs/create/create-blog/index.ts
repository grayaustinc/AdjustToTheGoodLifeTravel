//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { BlogDocumentData } from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

const defaultBlogDocument: Partial<BlogDocumentData> = {
  title: "New Blog",
  description: "This is the start of a new Blog Post",
  published: false,
};

async function createBlog() {
  const cursor = await database.query(aql`INSERT ${defaultBlogDocument} INTO ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<BlogDocumentData>;
  }
  throw new DatabaseError("Failed to insert blog document");
}

export default createDatabaseWrapper(createBlog);
