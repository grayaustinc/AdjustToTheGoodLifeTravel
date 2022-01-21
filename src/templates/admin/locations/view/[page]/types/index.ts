import type { LocationDocumentData } from "libs/arangodb/collections/locations";

export const TOTAL_LOCATIONS_PER_PAGE = 10;

export interface PageProps {
  locations: LocationDocumentData[];
  page: number;
  total: number;
}
