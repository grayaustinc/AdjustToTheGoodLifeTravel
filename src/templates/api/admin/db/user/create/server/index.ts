//node_modules
import bcrypt from "bcrypt";
import assign from "lodash/assign";

//libs
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";

//helpers
import createUser from "./create-user";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const data = await schema.validate(req.body, { stripUnknown: true });
  const password = await bcrypt.hash(data.password, 15);
  const user = await createUser(assign(data, { password: password }));
  return res.status(200).json({ ok: true, user: user });
});

export default handler;
