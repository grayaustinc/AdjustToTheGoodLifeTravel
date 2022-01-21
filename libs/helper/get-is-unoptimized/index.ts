interface ImageType {
  src: string;
  srcType: "STATIC" | "EXTERNAL" | string;
}

function isUnoptimized(image?: ImageType | null) {
  switch (image?.srcType) {
    default:
    case "STATIC":
      return false;
    case "EXTERNAL":
      return true;
  }
}

export default isUnoptimized;
