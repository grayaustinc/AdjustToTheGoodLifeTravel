//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { DraftDocumentData } from "libs/arangodb/collections/drafts";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

import type { DraftCreateSchemaType } from "../../validation";

async function createDraft(data: DraftCreateSchemaType) {
  const cursor = await database.query(aql`INSERT ${data} INTO ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<DraftDocumentData>;
  }
  throw new DatabaseError("Failed to create a draft document");
}

export default createDatabaseWrapper(createDraft);
