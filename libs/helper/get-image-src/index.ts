//helpers
import getStaticUrl from "libs/helper/get-static-url";

interface ImageType {
  src: string;
  srcType: "STATIC" | "EXTERNAL" | string;
}

function getImageSrc(image?: ImageType | null) {
  switch (image?.srcType) {
    default:
      return null;
    case "STATIC":
      return getStaticUrl(image.src, false);
    case "EXTERNAL":
      return image.src;
  }
}

export default getImageSrc;
