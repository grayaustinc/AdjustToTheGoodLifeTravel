//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/drafts";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

//validation
import type { SchemaType } from "../../validation";

async function deleteBlog(data: SchemaType) {
  const cursor = await database.query(aql`REMOVE ${data} IN ${collection} RETURN OLD`);
  if (cursor.hasNext) {
    return;
  }
  throw new DatabaseError("Failed to delete draft document");
}

export default createDatabaseWrapper(deleteBlog);
