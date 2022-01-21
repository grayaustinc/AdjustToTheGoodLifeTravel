//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";

const handler = createServerSideHandler();

handler.use(LoginRedirectMiddleware);

const getServerSideProps = handler.run(async (context) => {
  return {
    props: {},
  };
});

export default getServerSideProps;
