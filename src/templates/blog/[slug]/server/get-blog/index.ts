//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//types
import { ModifiedBlogKeys, ModifiedBlogDocumentData } from "../../types";

async function getBlog(slug: string) {
  const cursor = await database.query(aql`FOR b IN ${collection} FILTER b.slug == ${slug} FILTER b.published == true LIMIT 1 RETURN KEEP(b, ${ModifiedBlogKeys})`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<ModifiedBlogDocumentData>;
  }
  return null;
}

export default createDatabaseWrapper(getBlog);
