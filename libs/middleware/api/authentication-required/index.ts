import { NextApiRequest, NextApiResponse } from "next";
import { AuthenticationError } from "libs/errors";
import getSession from "libs/session";
import { Middleware } from "next-connect";

const handler: Middleware<NextApiRequest, NextApiResponse> = async (req, res, next) => {
  const session = await getSession(req, res);
  if (session.user) {
    return next();
  }
  return next(new AuthenticationError("A user must be signed in"));
};

export default handler;
