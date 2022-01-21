import type { LocationDocumentData } from "libs/arangodb/collections/locations";

type LocationDataArray = LocationDocumentData[];

export interface PageProps {
  locations: LocationDataArray;
}
