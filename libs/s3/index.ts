import { S3 } from "aws-sdk";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const client = new S3({
  endpoint: serverRuntimeConfig.S3_ENDPOINT,
  accessKeyId: serverRuntimeConfig.S3_ACCESS_KEY_ID,
  secretAccessKey: serverRuntimeConfig.S3_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

export default client;
