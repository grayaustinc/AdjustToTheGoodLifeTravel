//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";

//helpers
import getMentions from "./get-mentions";
import type { PageProps } from "../types";

const handler = crateGetStaticHandler<PageProps>();

handler.use(ErrorWrapperMiddleware);

export const getStaticProps = handler.run(async (_) => {
  const mentions = await getMentions();
  return {
    props: {
      mentions: mentions,
    },
    revalidate: 300,
  };
});

export default getStaticProps;
