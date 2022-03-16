//node_modules
import urlJoin from "proper-url-join";

function getStaticUrl(path: string, trailingSlash = true) {
  return urlJoin("/static/", path, { trailingSlash });
}

export default getStaticUrl;
