import * as yup from "yup";

export const image = yup.object({
  src: yup.string().required(),
  srcType: yup.string().oneOf(["EXTERNAL", "STATIC"]).required(),
  alt: yup.string().optional(),
  quality: yup.number().optional(),
});

export const schema = yup.object({
  _key: yup.string().optional(),
  title: yup.string().required(),
  url: yup.string().url().required(),
  image: image.nullable(true),
  published_time: yup.number().required(),
});

export type MentionSchemaType = yup.InferType<typeof schema>;

export default schema;
