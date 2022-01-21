//node_modules
import urlJoin from "url-join";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_WEBSITE_DOMAIN } = publicRuntimeConfig;

function getWebsiteUrl(...parts: string[]) {
  const url = new URL(urlJoin(parts), NEXT_PUBLIC_WEBSITE_DOMAIN);
  return url.href;
}

export default getWebsiteUrl;
