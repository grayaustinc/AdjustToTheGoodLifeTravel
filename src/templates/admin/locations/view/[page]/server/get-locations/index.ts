//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { LocationDocumentData } from "libs/arangodb/collections/locations";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//constants
import { TOTAL_LOCATIONS_PER_PAGE } from "src/templates/admin/locations/view/[page]/types";

async function getLocations(page: number) {
  const offset = Math.max(page - 1, 0) * TOTAL_LOCATIONS_PER_PAGE;
  const cursor = await database.query(aql`FOR b IN ${collection} SORT b._key ASC LIMIT ${offset}, ${TOTAL_LOCATIONS_PER_PAGE} RETURN b`);
  return cursor.all() as Promise<LocationDocumentData[]>;
}

export default createDatabaseWrapper(getLocations);
