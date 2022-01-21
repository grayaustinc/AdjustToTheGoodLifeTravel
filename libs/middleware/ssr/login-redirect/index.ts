import getSession from "libs/session";
import { Middleware } from "libs/get-server-side-props";

const handler: Middleware<any> = async (context, next) => {
  const session = await getSession(context.req, context.res);
  if (session.user) {
    return await next();
  }
  return {
    redirect: {
      destination: "/admin/login/",
      permanent: false,
    },
  };
};

export default handler;
