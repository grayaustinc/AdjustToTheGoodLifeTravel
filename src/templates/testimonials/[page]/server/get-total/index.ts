//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/testimonials";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

async function getTotal() {
  const cursor = await database.query(aql`RETURN COUNT(${collection})`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<number>;
  }
  throw new DatabaseError("Failed to retrieve length of testimonials");
}

export default createDatabaseWrapper(getTotal);
