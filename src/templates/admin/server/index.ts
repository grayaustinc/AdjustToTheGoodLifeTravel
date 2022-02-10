//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";

//router
import router from "libs/ssr-router";

//paths
import paths from "./paths";

const handler = createServerSideHandler<any>();

handler.use(LoginRedirectMiddleware);

export const getServerSideProps = handler.run(router(paths));

export default getServerSideProps;
