//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//locals
import { BlogKeys, ModifiedBlogDocumentData } from "src/templates/blogs/[page]/types";
import { TOTAL_BLOGS_PER_PAGE } from "src/templates/blogs/[page]/types";

async function getBlogs(page: number) {
  const offset = Math.max(page - 1, 0) * TOTAL_BLOGS_PER_PAGE;
  const cursor = await database.query(
    aql`FOR b IN ${collection} FILTER b.published == true SORT b.published_time DESC LIMIT ${offset}, ${TOTAL_BLOGS_PER_PAGE} RETURN KEEP(b, ${BlogKeys})`
  );
  return cursor.all() as Promise<ModifiedBlogDocumentData[]>;
}

export default createDatabaseWrapper(getBlogs);
