//node_modules
import getConfig from "next/config";
import isString from "lodash/isString";

//libs
import { LocationDocumentData } from "libs/arangodb/collections/locations";

//router
import { PathHandler } from "libs/ssr-router";

export interface PageProps {
  WEBSITE_S3_DOMAIN: string;
  WEBSITE_DATABASE_DOMAIN: string;
  WEBSITE_EMAIL_DOMAIN: string;
}

const handler: PathHandler<PageProps> = async (_, context) => {
  const { serverRuntimeConfig } = getConfig();
  const { WEBSITE_S3_DOMAIN, WEBSITE_DATABASE_DOMAIN, WEBSITE_EMAIL_DOMAIN } = serverRuntimeConfig;

  return context.props({
    WEBSITE_S3_DOMAIN,
    WEBSITE_DATABASE_DOMAIN,
    WEBSITE_EMAIL_DOMAIN,
  });
};

export default handler;
