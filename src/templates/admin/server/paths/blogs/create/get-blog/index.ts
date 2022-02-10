//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { BlogDocumentData } from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function retrieveBlog(_key: string) {
  const cursor = await database.query(aql`FOR blog IN ${collection} FILTER blog._key == ${_key} LIMIT 1 RETURN blog`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<BlogDocumentData>;
  }
  return null;
}

export default createDatabaseWrapper(retrieveBlog);
