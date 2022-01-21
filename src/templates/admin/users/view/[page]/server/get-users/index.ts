//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { UserDocumentData } from "libs/arangodb/collections/users";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//constants
import { TOTAL_USERS_PER_PAGE } from "src/templates/admin/users/view/[page]/types";

async function getLocations(page: number) {
  const offset = Math.max(page - 1, 0) * TOTAL_USERS_PER_PAGE;
  const cursor = await database.query(aql`FOR doc IN ${collection} SORT doc._key ASC LIMIT ${offset}, ${TOTAL_USERS_PER_PAGE} RETURN doc`);
  return cursor.all() as Promise<UserDocumentData[]>;
}

export default createDatabaseWrapper(getLocations);
