//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";

//helpers
import type { PageProps } from "../types";

const handler = crateGetStaticHandler<PageProps>();

handler.use(ErrorWrapperMiddleware);

export const getStaticProps = handler.run(async (_) => {
  return {
    props: {},
    revalidate: 300,
  };
});

export default getStaticProps;
