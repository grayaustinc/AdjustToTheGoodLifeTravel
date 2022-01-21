//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { BlogDocumentData } from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

//types
import type { BlogSchemaType } from "../../validation";

async function saveBlog(data: BlogSchemaType) {
  const cursor = await database.query(aql`UPDATE ${data} IN ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<BlogDocumentData>;
  }
  throw new DatabaseError("Failed to save blog document");
}

export default createDatabaseWrapper(saveBlog);
