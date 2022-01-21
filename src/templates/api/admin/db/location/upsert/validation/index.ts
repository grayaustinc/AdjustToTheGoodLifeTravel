import * as yup from "yup";

export const imageSchema = yup.object({
  src: yup.string().required(),
  srcType: yup.string().oneOf(["EXTERNAL", "STATIC"]).required(),
  alt: yup.string().optional(),
  quality: yup.number().optional(),
});

export type ImageSchemaType = yup.InferType<typeof imageSchema>;

export const locationSchema = yup.object({
  _key: yup.string().optional(),
  image: imageSchema.nullable(true),
  name: yup.string().required(),
  description: yup.string().required(),
  coordinates: yup.array(yup.number().required()).length(2).required(),
});

export type LocationSchemaType = yup.InferType<typeof locationSchema>;

export default locationSchema;
