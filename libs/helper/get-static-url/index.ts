//node_modules
import urlJoin from "url-join";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_STATIC_DOMAIN } = publicRuntimeConfig;

function getStaticUrl(...parts: string[]) {
  return urlJoin(NEXT_PUBLIC_STATIC_DOMAIN, ...parts);
}

export default getStaticUrl;
