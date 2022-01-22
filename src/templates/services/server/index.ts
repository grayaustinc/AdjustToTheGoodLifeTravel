//libs
import crateGetStaticHandler from "libs/get-static-props";
import ErrorWrapperMiddleware from "libs/middleware/ssg/error-wrapper";

const handler = crateGetStaticHandler();

handler.use(ErrorWrapperMiddleware);

export const getStaticProps = handler.run(async (context) => {
  return {
    props: {},
  };
});

export default getStaticProps;
