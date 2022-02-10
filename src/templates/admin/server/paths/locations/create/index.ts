//node_modules
import isString from "lodash/isString";

//libs
import { LocationDocumentData } from "libs/arangodb/collections/locations";

//router
import { PathHandler } from "libs/ssr-router";

//helpers
import getLocation from "./get-location";

export interface PageProps {
  location?: LocationDocumentData;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const key = slug[0];
  if (isString(key)) {
    const location = await getLocation(key);
    if (location) {
      return context.props({
        location: location,
      });
    }
    return context.notFound();
  }
  return context.props({});
};

export default handler;
