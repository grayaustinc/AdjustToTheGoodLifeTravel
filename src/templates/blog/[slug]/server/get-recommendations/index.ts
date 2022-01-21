//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//types
import { ModifiedBlogKeys, ModifiedBlogDocumentData } from "../../types";

async function getBlog(slug: string) {
  const cursor = await database.query(aql`FOR b IN ${collection} FILTER b.published == true FILTER b.slug != ${slug} SORT RAND() LIMIT 3 RETURN KEEP(b, ${ModifiedBlogKeys})`);
  return cursor.all() as Promise<ModifiedBlogDocumentData[]>;
}

export default createDatabaseWrapper(getBlog);
