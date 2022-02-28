import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";

const handler = nc<NextApiRequest, NextApiResponse<any>>();

handler.use((req, res, next) => {
  console.log(req.url);
  next();
});

handler.get("/api/adminv2/test/", (req, res) => {
  res.status(200).send("This is the test location");
});

handler.get("/api/adminv2/test2", (req, res) => {
  res.status(200).send("Cool!  This works to!");
});

export default handler;
