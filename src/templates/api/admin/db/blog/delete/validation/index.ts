import * as yup from "yup";

export const schema = yup.object({
  _id: yup.string().required(),
  _key: yup.string().required(),
});

export type SchemaType = yup.InferType<typeof schema>;

export default schema;
