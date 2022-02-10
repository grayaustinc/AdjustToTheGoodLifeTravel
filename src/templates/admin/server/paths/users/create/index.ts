//node_modules
import isString from "lodash/isString";

//libs
import { UserDocumentData } from "libs/arangodb/collections/users";

//router
import { PathHandler } from "libs/ssr-router";

//helpers
import getUser from "./get-user";

export interface PageProps {
  user: UserDocumentData;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const key = slug[0];
  if (isString(key)) {
    const user = await getUser(key);
    if (user) {
      return context.props({
        user: user,
      });
    }
    return context.notFound();
  }
  //Cannot create a new user, only a super-admin can currently from database
  return context.notFound();
};

export default handler;
