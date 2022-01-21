import * as yup from "yup";

export const schema = yup
  .object({
    _key: yup.string().required(),
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export type UserSchemaType = yup.InferType<typeof schema>;

export default schema;
