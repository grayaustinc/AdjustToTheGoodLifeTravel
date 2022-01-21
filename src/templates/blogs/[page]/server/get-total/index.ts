//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

async function getTotal() {
  const cursor = await database.query(aql`RETURN COUNT(FOR doc IN ${collection} FILTER doc.published == true RETURN 1)`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<number>;
  }
  throw new DatabaseError("Failed to retrieve total number of published blogs");
}

export default createDatabaseWrapper(getTotal);
