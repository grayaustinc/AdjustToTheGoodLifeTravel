//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection from "libs/arangodb/collections/drafts";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//types
import { DraftKeys, DraftMetadata } from "../../types";

async function findUser(blog_id: string) {
  const cursor = await database.query(aql`FOR draft IN ${collection} FILTER draft.blog_id == ${blog_id} SORT draft.modified_time DESC RETURN KEEP(draft, ${DraftKeys})`);
  return cursor.all() as Promise<DraftMetadata[]>;
}

export default createDatabaseWrapper(findUser);
