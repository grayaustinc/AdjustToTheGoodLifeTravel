//helpers
import getWebsiteUrl from "../get-website-url";
import type { Sizes } from "../sizes";

export type { Sizes } from "../sizes";

function getImageLoaderSrc(src: string, width: Sizes, quality?: number) {
  return getWebsiteUrl(`/_next/image/?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`, true);
}

export default getImageLoaderSrc;
