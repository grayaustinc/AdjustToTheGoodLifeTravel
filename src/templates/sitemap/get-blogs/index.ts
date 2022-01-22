//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { BlogDocumentData } from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

const keys = ["slug", "modified_time"] as const;

type ModifiedBlogDocumentData = Pick<BlogDocumentData, typeof keys[number]>;

async function getSlugs() {
  const cursor = await database.query(aql`FOR doc IN ${collection} FILTER doc.published == true RETURN KEEP(doc, ${keys})`);
  return cursor.all() as Promise<ModifiedBlogDocumentData[]>;
}

export default createDatabaseWrapper(getSlugs);
