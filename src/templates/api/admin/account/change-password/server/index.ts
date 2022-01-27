//node_modules
import bcrypt from "bcrypt";

//logger
import logger from "libs/logger";

//libs
import getSession from "libs/session";
import { AuthenticationError, SessionError } from "libs/errors";
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";

//helpers
import updatePassword from "./update-password";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const session = await getSession(req, res);
  if (session.user) {
    const data = await schema.validate(req.body, { stripUnknown: true });
    const compare = await bcrypt.compare(data.oldPassword, session.user.password);
    if (compare) {
      const password = await bcrypt.hash(data.newPassword, 15);
      const user = await updatePassword(session.user, password);
      session.user = user;
      await session.commit();
      logger.log("info", `User "${user.username}" changed password`);
      return res.status(200).json({ ok: true, user: user });
    }
    throw new AuthenticationError("Old password does not match current password");
  }
  throw new SessionError("A user must be logged in");
});

export default handler;
