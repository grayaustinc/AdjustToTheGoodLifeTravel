import * as yup from "yup";

const schema = yup.object({
  src: yup.string().required(),
  srcType: yup.string().oneOf(["EXTERNAL", "STATIC"]).required(),
  alt: yup.string().optional(),
  quality: yup.number().optional(),
});

export type ImageDataType = yup.InferType<typeof schema>;

export default schema;
