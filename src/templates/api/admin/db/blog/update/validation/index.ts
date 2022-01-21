import type { RawDraftContentState } from "draft-js";
import * as yup from "yup";

export const imageSchema = yup.object({
  src: yup.string().required(),
  srcType: yup.string().oneOf(["EXTERNAL", "STATIC"]).required(),
});

export type ImageSchemaType = yup.InferType<typeof imageSchema>;

export const blogSchema = yup.object({
  _key: yup.string().required(),
  authors: yup.array(yup.string().required()).min(1).required(),
  image: imageSchema.nullable(true),
  title: yup.string().required(),
  description: yup.string().required(),
  slug: yup.string().required(),
  published_time: yup.number().required(),
  modified_time: yup.number().required(),
  published: yup.boolean().required(),
  content: yup.mixed<RawDraftContentState>().required(),
});

export type BlogSchemaType = yup.InferType<typeof blogSchema>;

export default blogSchema;
