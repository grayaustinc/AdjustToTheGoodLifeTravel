import { Database } from "arangojs";

import getConfig from "next/config";
const { serverRuntimeConfig } = getConfig();

const database = new Database({
  url: serverRuntimeConfig.ARANGO_URL,
  databaseName: serverRuntimeConfig.ARANGO_DATABASE_NAME,
  auth: {
    username: serverRuntimeConfig.ARANGO_USERNAME,
    password: serverRuntimeConfig.ARANGO_PASSWORD,
  },
});

export default database;
