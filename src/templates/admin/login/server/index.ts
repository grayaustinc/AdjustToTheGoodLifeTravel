//libs
import getSession from "libs/session";
import createServerSideHandler from "libs/get-server-side-props";

const handler = createServerSideHandler();

handler.use(async (context, next) => {
  const session = await getSession(context.req, context.res);
  if (session.user) {
    return {
      redirect: {
        destination: "/admin/",
        permanent: false,
      },
    };
  }
  return next();
});

export const getServerSideProps = handler.run(async (context) => {
  return {
    props: {},
  };
});

export default getServerSideProps;
