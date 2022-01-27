//node_modules
import bcrypt from "bcrypt";

//logger
import logger from "libs/logger";

//libs
import { AuthenticationError } from "libs/errors";
import nextConnectHandler from "libs/errors/next-connect-handler";
import { getIpFromRequest } from "get-ip-from-request";
import getSession from "libs/session";

//helpers
import findUser from "./find-user";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.post(async (req, res) => {
  const ip = getIpFromRequest(req as any);
  const data = await schema.validate(req.body, { stripUnknown: true });

  const user = await findUser(data.username);
  if (user) {
    const compare = await bcrypt.compare(data.password, user.password);
    if (compare) {
      const session = await getSession(req, res);
      session.user = user;
      await session.commit();
      logger.log("info", `User "${user.username}" logged in from ${ip}`);
      return res.status(200).json({ ok: true });
    } else {
      logger.log("info", `User "${user.username}" attempted login from ${ip}`);
      throw new AuthenticationError("password does not match");
    }
  } else {
    logger.log("info", `Someone attempted to login with username: "${data.username}" from ${ip}`);
    throw new AuthenticationError("Username does not exist");
  }
});

export default handler;
