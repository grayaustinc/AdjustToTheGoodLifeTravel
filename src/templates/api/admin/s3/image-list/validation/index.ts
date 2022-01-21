import * as yup from "yup";

const schema = yup.object({
  Bucket: yup.string().required().default("public"),
  MaxKeys: yup.number().optional(),
  Prefix: yup.string().optional(),
  StartAfter: yup.string().optional(),
  ContinuationToken: yup.string().optional(),
});

export type ListImageBodyType = yup.InferType<typeof schema>;

export default schema;
