//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { DraftDocumentData } from "libs/arangodb/collections/drafts";
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function retrieveBlog(blog: BlogDocumentData) {
  const cursor = await database.query(aql`FOR draft IN ${collection} FILTER draft.blog_id == ${blog._id} SORT draft.modified_time DESC LIMIT 1 RETURN draft`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<DraftDocumentData>;
  }
  return null;
}

export default createDatabaseWrapper(retrieveBlog);
