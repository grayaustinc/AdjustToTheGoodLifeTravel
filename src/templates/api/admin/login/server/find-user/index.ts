//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { UserDocumentData } from "libs/arangodb/collections/users";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function findUser(username: string) {
  const cursor = await database.query(aql`FOR u IN ${collection} FILTER u.username == ${username} LIMIT 1 RETURN u`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<UserDocumentData>;
  }
  return null;
}

export default createDatabaseWrapper(findUser);
