//helpers
import getStaticUrl from "libs/helper/get-static-url";
import getImageLoaderSrc, { ImageWidth } from "libs/helper/get-image-loader-absolute-src";

interface ImageType {
  src: string;
  srcType: "STATIC" | "EXTERNAL" | string;
}

function getImageAbsoluteUrl(image: ImageType | null | undefined, width: ImageWidth, quality?: number) {
  switch (image?.srcType) {
    default:
      return null;
    case "STATIC":
      return getImageLoaderSrc(getStaticUrl(image.src), width, quality);
    case "EXTERNAL":
      return image.src;
  }
}

export default getImageAbsoluteUrl;
