//node_modules
import { aql } from "arangojs";
import { ContentState, convertToRaw } from "draft-js";

//libs
import database from "libs/arangodb";
import collection, { DraftDocumentData } from "libs/arangodb/collections/drafts";
import type { BlogDocumentData } from "libs/arangodb/collections/blogs";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

type CreateDataType = Omit<DraftDocumentData, "_id" | "_key" | "_rev">;

const initialRawContentState = convertToRaw(ContentState.createFromText("Start Editing here!"));

async function createDraft(blog: BlogDocumentData, draft?: DraftDocumentData | null) {
  const data: CreateDataType = {
    blog_id: blog._id,
    modified_time: Date.now(),
    content: draft?.content || initialRawContentState,
  };

  const cursor = await database.query(aql`INSERT ${data} INTO ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<DraftDocumentData>;
  }
  throw new DatabaseError("Failed to create draft document");
}

export default createDatabaseWrapper(createDraft);
