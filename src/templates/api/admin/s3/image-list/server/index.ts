//node_modules
import urlJoin from "proper-url-join";
import getConfig from "next/config";

//libs
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";
import s3 from "libs/s3";

//helpers
import validation from "../validation";
import { ResponseType } from "../types";

const { serverRuntimeConfig } = getConfig();
const { S3_BUCKET } = serverRuntimeConfig;

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

function getMaxKeys(MaxKeys?: number, Marker?: string) {
  if (MaxKeys) {
    return MaxKeys + (Marker ? 0 : 1);
  }
  return undefined;
}

handler.post(async (req, res) => {
  const { Prefix, Marker, MaxKeys } = await validation.validate(req.body, { stripUnknown: true });
  const result = await s3.listObjects({ Bucket: S3_BUCKET, Prefix: Prefix, Marker: Marker, MaxKeys: getMaxKeys(MaxKeys, Marker) }).promise();
  if (result.Contents) {
    const data = result.Contents.reduce<string[]>((prev, item, index) => {
      if (!Marker && index === 0) return prev;
      if (item.Key) prev.push(urlJoin(item.Key));
      return prev;
    }, []);
    return res.status(200).json({ ok: true, data: data, NextMarker: result.NextMarker });
  } else {
    return res.status(400).json({ ok: false, message: "Could not find bucket list" });
  }
});

export default handler;
