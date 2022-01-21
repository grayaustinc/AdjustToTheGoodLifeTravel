//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";

//helpers
import createBlog from "./create-blog";

const handler = createServerSideHandler();

handler.use(LoginRedirectMiddleware);

const getServerSideProps = handler.run(async (_) => {
  const blog = await createBlog();
  return {
    redirect: {
      destination: `/admin/blogs/create/${blog._key}/`,
      permanent: false,
    },
  };
});

export default getServerSideProps;
