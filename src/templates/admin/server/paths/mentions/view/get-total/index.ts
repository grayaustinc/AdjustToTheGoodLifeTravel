//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/mentions";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

async function getTotal() {
  const cursor = await database.query(aql`RETURN LENGTH(${collection})`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<number>;
  }
  throw new DatabaseError("Failed to retrieve full length of mentions collection");
}

export default createDatabaseWrapper(getTotal);
