//node_modules
import { aql } from "arangojs";
import database from "libs/arangodb";

//libs
import collection, { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//constants
import { TOTAL_DOCUMENTS_PER_PAGE } from "../constant";

async function getTestimonials(page: number) {
  const offset = Math.max(page - 1, 0) * TOTAL_DOCUMENTS_PER_PAGE;
  const cursor = await database.query(aql`FOR b IN ${collection} SORT b._key ASC LIMIT ${offset}, ${TOTAL_DOCUMENTS_PER_PAGE} RETURN b`);
  return cursor.all() as Promise<TestimonialDocumentData[]>;
}

export default createDatabaseWrapper(getTestimonials);
