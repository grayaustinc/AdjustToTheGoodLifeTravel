import * as yup from "yup";

export const schema = yup.object({
  _key: yup.string().optional(),
  title: yup.string().required(),
  rating: yup.number().min(0).max(10).required(),
  description: yup.string().required(),
  reviewer: yup.string().required(),
  locations: yup.string().required(),
});

export type TestimonialSchemaType = yup.InferType<typeof schema>;

export default schema;
