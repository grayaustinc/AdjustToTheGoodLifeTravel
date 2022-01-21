//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { UserDocumentData } from "libs/arangodb/collections/users";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function getLocation(_key: string) {
  const cursor = await database.query(aql`FOR doc IN ${collection} FILTER doc._key == ${_key} LIMIT 1 RETURN doc`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<UserDocumentData>;
  }
  return null;
}

export default createDatabaseWrapper(getLocation);
