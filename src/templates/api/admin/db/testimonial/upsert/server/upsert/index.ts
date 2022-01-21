//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import createDatabaseWrapper from "libs/errors/database-error-middleware";
import { DatabaseError } from "libs/errors";

//types
import type { TestimonialSchemaType } from "../../validation";

async function upsert(data: TestimonialSchemaType) {
  const cursor = await database.query(aql`UPSERT ${{ _key: data._key || null }} INSERT ${data} UPDATE ${data} IN ${collection} RETURN NEW`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<TestimonialDocumentData>;
  }
  throw new DatabaseError("Failed to upsert testimonial document");
}

export default createDatabaseWrapper(upsert);
