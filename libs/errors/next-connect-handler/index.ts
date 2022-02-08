//node_modules
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

//logger
import logger from "libs/logger";

//errors
import errors, { NotFoundError } from "libs/errors";

interface GoodResponse {
  ok: true;
  [key: string]: any;
}

interface BadResponse {
  ok: false;
  message: string;
}

export type InferResponse<T extends GoodResponse> = T | BadResponse;

function handler<T extends GoodResponse>() {
  const handler = nextConnect<NextApiRequest, NextApiResponse<InferResponse<T>>>({
    onError(error, _, res) {
      if (error instanceof NotFoundError) {
        return res.status(404).json({ ok: false, message: error.message });
      } else if (errors.some((ErrorInstance) => error instanceof ErrorInstance)) {
        return res.status(500).json({ ok: false, message: error.message });
      } else {
        logger.log("error", error);
        return res.status(500).json({ ok: false, message: `An unknown error occurred!` });
      }
    },
    onNoMatch(req, res) {
      res.status(405).json({ ok: false, message: `Method "${req.method}" Not Allowed` });
    },
  });
  return handler;
}

export default handler;
