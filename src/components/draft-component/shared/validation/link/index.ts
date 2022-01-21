import * as yup from "yup";

const schema = yup.object({
  href: yup.string().url().required(),
});

export type LinkDataType = yup.InferType<typeof schema>;

export default schema;
