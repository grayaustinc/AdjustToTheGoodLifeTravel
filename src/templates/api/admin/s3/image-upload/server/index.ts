//node_modules
import { nanoid } from "nanoid";
import urlJoin from "proper-url-join";

import s3 from "libs/s3";
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";

//helpers
import validation from "../validation";

//types
import { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const data = await validation.validate(req.body, { stripUnknown: true });

  const buffer = Buffer.from(data.image.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const filename = nanoid(30) + ".webp";
  const objectName = urlJoin(data.objectPrefix || "", filename);
  const staticRelativeUrl = urlJoin(data.bucketName, objectName);

  const info = await s3.putObject({ Bucket: data.bucketName, Key: objectName, Body: buffer, ContentType: "image/webp" }).promise();

  return res.status(200).json({ ok: true, staticSrc: staticRelativeUrl, info: info });
});

export default handler;
