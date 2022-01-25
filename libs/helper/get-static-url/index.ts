//node_modules
import urlJoin from "proper-url-join";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_STATIC_DOMAIN } = publicRuntimeConfig;

function getStaticUrl(path: string) {
  return urlJoin(NEXT_PUBLIC_STATIC_DOMAIN, path, { trailingSlash: true });
}

export default getStaticUrl;
