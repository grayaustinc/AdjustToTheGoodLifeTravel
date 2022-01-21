//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { UserDocumentData } from "libs/arangodb/collections/users";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

//types
import type { UserSchemaType } from "../../validation";

async function upsert(data: UserSchemaType) {
  const cursor = await database.query(aql`REMOVE ${data} IN ${collection} RETURN OLD`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<UserDocumentData>;
  }
  throw new DatabaseError("Failed to delete location document");
}

export default createDatabaseWrapper(upsert);
