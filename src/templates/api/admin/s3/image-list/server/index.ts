//node_modules
import urlJoin from "proper-url-join";

//libs
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";
import s3 from "libs/s3";

//helpers
import validation from "../validation";
import { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const params = await validation.validate(req.body, { stripUnknown: true });
  const result = await s3.listObjectsV2(params).promise();

  if (result.Contents) {
    const data = result.Contents.reduce<string[]>((prev, item) => {
      if (item.Key) prev.push(urlJoin(params.Bucket, item.Key, "/"));
      return prev;
    }, []);
    return res.status(200).json({ ok: true, data: data, ContinuationToken: result.NextContinuationToken });
  } else {
    return res.status(400).json({ ok: false, message: "Could not find bucket list" });
  }
});

export default handler;
