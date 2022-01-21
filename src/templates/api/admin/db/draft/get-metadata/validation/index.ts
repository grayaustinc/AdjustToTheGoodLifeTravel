import * as yup from "yup";

const schema = yup.object({
  blog_id: yup.string().required(),
});

export type GetDraftsMetadataSchemaType = yup.InferType<typeof schema>;

export default schema;
