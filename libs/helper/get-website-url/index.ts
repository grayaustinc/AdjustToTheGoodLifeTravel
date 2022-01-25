//node_modules
import urlJoin from "proper-url-join";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { NEXT_PUBLIC_WEBSITE_DOMAIN } = publicRuntimeConfig;

function getWebsiteUrl(path: string): string {
  const url = new URL(urlJoin(path, { trailingSlash: true }), NEXT_PUBLIC_WEBSITE_DOMAIN);
  return url.href;
}

export default getWebsiteUrl;
