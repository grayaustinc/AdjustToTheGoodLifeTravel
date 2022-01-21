//node_modules
import { aql } from "arangojs";

//libs
import database from "libs/arangodb";
import collection, { LocationDocumentData } from "libs/arangodb/collections/locations";
import createDatabaseWrapper from "libs/errors/database-error-middleware";

type TestimonialDataArray = LocationDocumentData[];

async function getTestimonials() {
  const cursor = await database.query(aql`FOR doc IN ${collection} RETURN doc`);
  const data: TestimonialDataArray = await cursor.all();
  return data;
}

export default createDatabaseWrapper(getTestimonials);
