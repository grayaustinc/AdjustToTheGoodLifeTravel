//node_modules
import SHA1 from "crypto-js/sha1";
import urlJoin from "proper-url-join";
import getConfig from "next/config";

import s3 from "libs/s3";
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";

//helpers
import validation from "../validation";

//logger
import logger from "libs/logger";

//types
import { ResponseType } from "../types";

const { serverRuntimeConfig } = getConfig();
const { S3_BUCKET } = serverRuntimeConfig;

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const data = await validation.validate(req.body, { stripUnknown: true });

  const buffer = Buffer.from(data.image.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const name = SHA1(buffer.toString());
  const key = name + ".webp";
  const staticSrc = urlJoin(S3_BUCKET, "/", key);

  const info = await s3.putObject({ Bucket: S3_BUCKET, Key: key, Body: buffer, ContentType: "image/webp" }).promise();

  logger.info(`Image ${key} was uploaded successfully`);

  return res.status(200).json({ ok: true, staticSrc: staticSrc, info: info });
});

export default handler;
