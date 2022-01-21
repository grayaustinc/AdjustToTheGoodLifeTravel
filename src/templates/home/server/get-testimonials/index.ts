//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

async function getTestimonials(limit: number) {
  const cursor = await database.query(aql`FOR t IN ${collection} SORT t.rating DESC LIMIT ${limit} RETURN t`);
  return cursor.all() as Promise<TestimonialDocumentData[]>;
}

export default createDatabaseWrapper(getTestimonials);
