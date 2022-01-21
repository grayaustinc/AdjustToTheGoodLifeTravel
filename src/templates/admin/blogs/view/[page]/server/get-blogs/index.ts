//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { BlogDocumentData } from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//locals
import { TOTAL_BLOGS_PER_PAGE } from "src/templates/admin/blogs/view/[page]/types";

async function getBlogs(page: number) {
  const offset = Math.max(page - 1, 0) * TOTAL_BLOGS_PER_PAGE;
  const cursor = await database.query(aql`FOR b IN ${collection} SORT b.published_time DESC LIMIT ${offset}, ${TOTAL_BLOGS_PER_PAGE} RETURN b`);
  return cursor.all() as Promise<BlogDocumentData[]>;
}

export default createDatabaseWrapper(getBlogs);
