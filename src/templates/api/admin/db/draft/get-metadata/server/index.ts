//libs
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";

//helpers
import getDraftsMetadata from "./get-drafts-metadata";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const data = await schema.validate(req.body, { stripUnknown: true });
  const drafts = await getDraftsMetadata(data.blog_id);
  return res.status(200).json({ ok: true, drafts: drafts });
});

export default handler;
