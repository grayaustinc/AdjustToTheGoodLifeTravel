//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { MentionDocumentData } from "libs/arangodb/collections/mentions";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function getMentions() {
  const cursor = await database.query(aql`FOR doc IN ${collection} SORT doc.published_time DESC RETURN doc`);
  return cursor.all() as Promise<MentionDocumentData[]>;
}

export default createDatabaseWrapper(getMentions);
