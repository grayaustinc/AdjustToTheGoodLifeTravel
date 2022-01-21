//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { TestimonialDocumentData } from "libs/arangodb/collections/testimonials";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

//locals
import { TOTAL_TESTIMONIALS_PER_PAGE } from "src/templates/testimonials/[page]/types";

async function getTestimonials(page: number) {
  const offset = Math.max(page - 1, 0) * TOTAL_TESTIMONIALS_PER_PAGE;
  const cursor = await database.query(aql`FOR t IN ${collection} SORT t.rating DESC LIMIT ${offset}, ${TOTAL_TESTIMONIALS_PER_PAGE} RETURN t`);
  return cursor.all() as Promise<TestimonialDocumentData[]>;
}

export default createDatabaseWrapper(getTestimonials);
