import * as yup from "yup";

const schema = yup.object({
  image: yup.string().required(),
});

export type UploadImageBodyType = yup.InferType<typeof schema>;

export default schema;
