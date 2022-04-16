//router
import { PathHandler } from "libs/ssr-router";

//libs
import type { LocationDocumentData } from "libs/arangodb/collections/locations";
import getPageNumber from "libs/helper/get-page-number";

//helpers
import getLocations from "./get-locations";
import getTotal from "./get-total";

export interface PageProps {
  locations: LocationDocumentData[];
  page: number;
  total: number;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const page = getPageNumber(slug[0]);
  if (page > 0) {
    const [locations, total] = await Promise.all([getLocations(page), getTotal()]);
    return context.props({
      locations: locations,
      page: page,
      total: total,
    });
  }
  return context.notFound();
};

export default handler;
