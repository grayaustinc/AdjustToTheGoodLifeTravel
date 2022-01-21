import * as yup from "yup";

const schema = yup.object({
  blog_id: yup.string().required(),
  modified_time: yup.number().required(),
  content: yup.mixed().optional(),
});

export type DraftCreateSchemaType = yup.InferType<typeof schema>;

export default schema;
