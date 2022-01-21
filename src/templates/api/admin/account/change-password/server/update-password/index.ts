//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { UserDocumentData } from "libs/arangodb/collections/users";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

async function upsert(user: UserDocumentData, password: string) {
  const data = { _key: user._key, password: password };
  const cursor = await database.query(aql`UPDATE ${data} IN ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<UserDocumentData>;
  }
  throw new DatabaseError("Failed to insert user document");
}

export default createDatabaseWrapper(upsert);
