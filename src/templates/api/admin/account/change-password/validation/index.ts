import * as yup from "yup";

export const schema = yup
  .object({
    oldPassword: yup.string().required(),
    newPassword: yup.string().required(),
  })
  .required();

export type ChangePasswordSchemaType = yup.InferType<typeof schema>;

export default schema;
