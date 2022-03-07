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

handler.post(async (req, res) => {
  const params = await validation.validate(req.body, { stripUnknown: true });
  const result = await s3.listObjectsV2({ Bucket: S3_BUCKET, ...params }).promise();

  if (result.Contents) {
    const data = result.Contents.reduce<string[]>((prev, item) => {
      if (item.Key) prev.push(urlJoin(item.Key, { trailingSlash: false }));
      return prev;
    }, []);
    return res.status(200).json({ ok: true, data: data, ContinuationToken: result.NextContinuationToken });
  } else {
    return res.status(400).json({ ok: false, message: "Could not find bucket list" });
  }
});

export default handler;
