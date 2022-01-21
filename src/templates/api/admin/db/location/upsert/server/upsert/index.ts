//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { LocationDocumentData } from "libs/arangodb/collections/locations";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

//types
import type { LocationSchemaType } from "../../validation";

async function upsert(data: LocationSchemaType) {
  const cursor = await database.query(aql`UPSERT ${{ _key: data._key || null }} INSERT ${data} UPDATE ${data} IN ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<LocationDocumentData>;
  }
  throw new DatabaseError("Failed to upsert location document");
}

export default createDatabaseWrapper(upsert);
