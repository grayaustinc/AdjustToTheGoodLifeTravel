//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";

//types
type PageProps = {};

const handler = createServerSideHandler<PageProps>();

handler.use(LoginRedirectMiddleware);

export const getServerSideProps = handler.run(async (_) => {
  return {
    props: {},
  };
});

export default getServerSideProps;
