import * as yup from "yup";

export const schema = yup
  .object({
    url: yup.string().url().required(),
  })
  .required();

export type MetascraperSchemaType = yup.InferType<typeof schema>;

export default schema;
