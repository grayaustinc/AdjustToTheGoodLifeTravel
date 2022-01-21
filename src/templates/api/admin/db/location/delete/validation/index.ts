import * as yup from "yup";

export const schema = yup.object({
  _key: yup.string().required(),
});

export type LocationSchemaType = yup.InferType<typeof schema>;

export default schema;
