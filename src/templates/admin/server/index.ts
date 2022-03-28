//node_modules
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import omit from "lodash/omit";

//libs
import getSession from "libs/session";

//router
import router, { InferType } from "libs/ssr-router";

//paths
import paths from "./paths";

const handler = router(paths);

export type PropsType = InferType<any>;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx.req, ctx.res);
  if (session.user) {
    const user: any = omit(session.user, ["password"]);
    return handler(ctx, user);
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login/",
      },
    };
  }
};
