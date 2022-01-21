import * as yup from "yup";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export type LoginSchemaType = yup.InferType<typeof schema>;

export default schema;
