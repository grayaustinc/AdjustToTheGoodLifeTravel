//node_modules
import bcrypt from "bcrypt";

//logger
import logger from "libs/logger";

//libs
import { AuthenticationError } from "libs/errors";
import nextConnectHandler from "libs/errors/next-connect-handler";
import getSession from "libs/session";

//helpers
import findUser from "./find-user";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.post(async (req, res) => {
  const data = await schema.validate(req.body, { stripUnknown: true });

  const user = await findUser(data.username);
  if (user) {
    const compare = await bcrypt.compare(data.password, user.password);
    if (compare) {
      const session = await getSession(req, res);
      session.user = user;
      await session.commit();
      logger.log("info", `User "${user.username}" logged in`);
      return res.status(200).json({ ok: true });
    } else {
      throw new AuthenticationError("password does not match");
    }
  } else {
    throw new AuthenticationError("Username does not exist");
  }
});

export default handler;
