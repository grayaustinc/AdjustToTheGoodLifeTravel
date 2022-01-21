import * as yup from "yup";

const schema = yup.object({
  videoId: yup.string().required(),
});

export type YoutubeDataType = yup.InferType<typeof schema>;

export default schema;
