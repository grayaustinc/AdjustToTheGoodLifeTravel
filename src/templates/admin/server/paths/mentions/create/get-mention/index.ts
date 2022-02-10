//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { MentionDocumentData } from "libs/arangodb/collections/mentions";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function getMention(_key: string) {
  const cursor = await database.query(aql`FOR doc IN ${collection} FILTER doc._key == ${_key} LIMIT 1 RETURN doc`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<MentionDocumentData>;
  }
  return null;
}

export default createDatabaseWrapper(getMention);
