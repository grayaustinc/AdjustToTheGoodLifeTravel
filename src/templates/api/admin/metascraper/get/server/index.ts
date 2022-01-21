//libs
import nextConnectHandler from "libs/errors/next-connect-handler";
import authRequiredMiddleware from "libs/middleware/api/authentication-required";

//helpers
import scrapeUrl from "./scrape";
import schema from "../validation";

//types
import type { ResponseType } from "../types";

const handler = nextConnectHandler<ResponseType>();

handler.use(authRequiredMiddleware);

handler.post(async (req, res) => {
  const data = await schema.validate(req.body, { stripUnknown: true });

  const metadata = await scrapeUrl(data.url);

  const parsed = {
    title: metadata.title,
    url: metadata.url,
    image: metadata.image,
    published_time: new Date(metadata.date).getTime(),
  };

  return res.status(200).json({ ok: true, data: parsed });
});

export default handler;
