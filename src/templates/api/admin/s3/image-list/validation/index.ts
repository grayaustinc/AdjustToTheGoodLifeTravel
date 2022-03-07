import * as yup from "yup";

const schema = yup.object({
  MaxKeys: yup.number().optional(),
  Prefix: yup.string().optional(),
  Marker: yup.string().optional(),
});

export type ListImageBodyType = yup.InferType<typeof schema>;

export default schema;
