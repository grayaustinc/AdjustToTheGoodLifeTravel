export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};

export { default } from "src/templates/api/admin/s3/image-upload/server";
