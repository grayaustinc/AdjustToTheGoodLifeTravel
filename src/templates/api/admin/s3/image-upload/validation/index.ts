import * as yup from "yup";

const schema = yup.object({
  image: yup.string().required(),
  bucketName: yup.string().required().default("public"),
  objectPrefix: yup.string().optional(),
});

export type UploadImageBodyType = yup.InferType<typeof schema>;

export default schema;
