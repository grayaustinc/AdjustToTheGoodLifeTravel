import * as yup from "yup";

const schema = yup.object({
  image: yup.string().required(),
  Bucket: yup.string().required().default("public"),
  Prefix: yup.string().optional(),
});

export type UploadImageBodyType = yup.InferType<typeof schema>;

export default schema;
