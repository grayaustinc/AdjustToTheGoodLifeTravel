import isString from "lodash/isString";
import toSafeInteger from "lodash/toSafeInteger";

export function getPageNumber(value: string | string[] | undefined) {
  if (isString(value)) {
    const page = toSafeInteger(value) || 1;
    return page;
  }
  return 1;
}

export default getPageNumber;
