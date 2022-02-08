//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";
import blogCollection from "libs/arangodb/collections/blogs";
import draftCollection from "libs/arangodb/collections/drafts";

//validation
import type { SchemaType } from "../../validation";

async function deleteBlog(data: SchemaType) {
  const cursor = await database.query(aql`
    let a = (REMOVE ${data} IN ${blogCollection} RETURN OLD)
    let b = (FOR draft IN ${draftCollection} FILTER draft.blog_id == ${data._id} REMOVE draft IN ${draftCollection} RETURN OLD)
    RETURN true
  `);
  if (cursor.hasNext) {
    return;
  }
  throw new DatabaseError("Failed to delete documents associated with blog");
}

export default createDatabaseWrapper(deleteBlog);
