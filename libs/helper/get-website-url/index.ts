//node_modules
import urlJoin from "proper-url-join";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
const { WEBSITE_DOMAIN } = publicRuntimeConfig;

function getWebsiteUrl(path: string, trailingSlash = true): string {
  const url = new URL(urlJoin(path, { trailingSlash }), WEBSITE_DOMAIN);
  return url.href;
}

export default getWebsiteUrl;
