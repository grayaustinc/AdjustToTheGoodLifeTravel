//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function getSlugs() {
  const cursor = await database.query(aql`FOR doc IN ${collection} FILTER doc.published == true RETURN doc.slug`);
  return cursor.all() as Promise<string[]>;
}

export default createDatabaseWrapper(getSlugs);
