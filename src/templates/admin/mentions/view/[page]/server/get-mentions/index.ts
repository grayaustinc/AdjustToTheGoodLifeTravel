//node_modules
import { aql } from "arangojs";
import database from "libs/arangodb";

//libs
import collection, { MentionDocumentData } from "libs/arangodb/collections/mentions";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//constants
import { TOTAL_MENTIONS_PER_PAGE } from "src/templates/admin/mentions/view/[page]/types";

async function getMentions(page: number) {
  const offset = Math.max(page - 1, 0) * TOTAL_MENTIONS_PER_PAGE;
  const cursor = await database.query(aql`FOR doc IN ${collection} SORT doc._key ASC LIMIT ${offset}, ${TOTAL_MENTIONS_PER_PAGE} RETURN doc`);
  return cursor.all() as Promise<MentionDocumentData[]>;
}

export default createDatabaseWrapper(getMentions);
