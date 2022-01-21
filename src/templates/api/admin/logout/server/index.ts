//libs
import { SessionError } from "libs/errors";
import nextConnectHandler from "libs/errors/next-connect-handler";
import getSession from "libs/session";

//logger
import logger from "libs/logger";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.post(async (req, res) => {
  const session = await getSession(req, res);
  if (session.user) {
    logger.log("info", `User "${session.user.username}" logged out`);
    await session.destroy();
    return res.status(200).json({ ok: true });
  } else {
    throw new SessionError("No user was logged in");
  }
});

export default handler;
