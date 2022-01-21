//helpers
import getWebsiteUrl from "../get-website-url";

const widths = [16, 32, 48, 64, 96, 128, 256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840] as const;

export type ImageWidth = typeof widths[number];

function getImageLoaderSrc(src: string, width: ImageWidth, quality?: number) {
  return getWebsiteUrl(`/_next/image/?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`);
}

export default getImageLoaderSrc;
