//node_modules
import AES from "crypto-js/aes";
import Encoding from "crypto-js/enc-utf8";
import nextSession from "next-session";
import getConfig from "next/config";

//logger
import logger from "libs/logger";

//store
import ArangoStore from "./store";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
const { SESSION_COOKIE_NAME, SESSION_SECRET } = serverRuntimeConfig;
const { NEXT_PUBLIC_WEBSITE_DOMAIN } = publicRuntimeConfig;

function decode(enc: string) {
  try {
    return AES.decrypt(enc, SESSION_SECRET).toString(Encoding);
  } catch {
    return null;
  }
}

function encode(raw: string) {
  return AES.encrypt(raw, SESSION_SECRET).toString();
}

const middleware = nextSession({
  name: SESSION_COOKIE_NAME,
  store: new ArangoStore(),
  touchAfter: 60 * 30,
  autoCommit: true,
  decode: decode,
  encode: encode,
  cookie: {
    secure: NEXT_PUBLIC_WEBSITE_DOMAIN.startsWith("https"),
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  },
});

import { DatabaseError } from "libs/errors";

export async function getSession(req: any, res: any) {
  try {
    return await middleware(req, res);
  } catch (error) {
    logger.log("error", error);
    throw new DatabaseError("Failed to retrieve session");
  }
}

export default getSession;
