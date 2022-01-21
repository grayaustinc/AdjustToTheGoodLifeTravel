//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { MentionDocumentData } from "libs/arangodb/collections/mentions";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

//types
import type { MentionSchemaType } from "../../validation";

async function deleteMention(data: MentionSchemaType) {
  const cursor = await database.query(aql`REMOVE ${data} IN ${collection} RETURN OLD`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<MentionDocumentData>;
  }
  throw new DatabaseError("Failed to delete mention document");
}

export default createDatabaseWrapper(deleteMention);
