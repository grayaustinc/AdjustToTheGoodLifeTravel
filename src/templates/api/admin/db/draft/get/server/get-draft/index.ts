//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { DraftDocumentData } from "libs/arangodb/collections/drafts";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { NotFoundError } from "libs/errors";

async function getDraft(_key: string) {
  const cursor = await database.query(aql`FOR draft IN ${collection} FILTER draft._key == ${_key} LIMIT 1 RETURN draft`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<DraftDocumentData>;
  }
  throw new NotFoundError("Unable to find draft document");
}

export default createDatabaseWrapper(getDraft);
