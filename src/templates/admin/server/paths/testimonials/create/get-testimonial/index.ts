//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function getTestimonial(_key: string) {
  const cursor = await database.query(aql`FOR item IN ${collection} FILTER item._key == ${_key} LIMIT 1 RETURN item`);
  if (cursor.hasNext) {
    return cursor.next() as Promise<TestimonialDocumentData>;
  }
  return null;
}

export default createDatabaseWrapper(getTestimonial);
