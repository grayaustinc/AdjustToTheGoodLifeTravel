//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { MentionDocumentData } from "libs/arangodb/collections/mentions";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

//types
import type { MentionSchemaType } from "../../validation";

async function upsert(data: MentionSchemaType) {
  const cursor = await database.query(aql`UPSERT ${{ _key: data._key || null }} INSERT ${data} UPDATE ${data} IN ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<MentionDocumentData>;
  }
  throw new DatabaseError("Failed to upsert mention document");
}

export default createDatabaseWrapper(upsert);
