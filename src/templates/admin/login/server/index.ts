//node_modules
import { GetServerSideProps } from "next";

//libs
import getSession from "libs/session";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context.req, context.res);
  if (session.user) {
    return {
      redirect: {
        destination: "/admin/",
        permanent: false,
      },
    };
  }
  return { props: {} };
};

export default getServerSideProps;
