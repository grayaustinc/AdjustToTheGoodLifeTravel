//libs
import nextConnectHandler from "libs/errors/next-connect-handler";

//logger
import logger from "libs/logger";

//helpers
import sendEmail from "./send-email";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.post(async (req, res) => {
  const data = await schema.validate(req.body, { stripUnknown: true });
  const info = await sendEmail(data);
  logger.log("info", info);
  return res.status(200).json({ ok: true });
});

export default handler;
