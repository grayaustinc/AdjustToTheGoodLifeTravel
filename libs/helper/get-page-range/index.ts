import range from "lodash/range";

function getPagingRange(current: number, totalPages: number, shown: number = 5) {
  if (shown > totalPages) shown = totalPages;

  let start = current - Math.floor(shown / 2);
  start = Math.max(start, 1);
  start = Math.min(start, 1 + totalPages - shown);

  return range(start, start + shown);
}

export default getPagingRange;
