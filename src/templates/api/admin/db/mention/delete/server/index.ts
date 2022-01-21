//libs
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";

//helpers
import deleteMention from "./delete";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const data = await schema.validate(req.body, { stripUnknown: true });
  const mention = await deleteMention(data);
  return res.status(200).json({ ok: true, mention: mention });
});

export default handler;
