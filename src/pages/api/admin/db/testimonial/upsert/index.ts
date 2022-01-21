export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};

export { default } from "src/templates/api/admin/db/testimonial/upsert/server";
