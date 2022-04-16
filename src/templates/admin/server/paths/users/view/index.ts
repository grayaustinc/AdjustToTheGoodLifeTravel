//router
import { PathHandler } from "libs/ssr-router";

//libs
import type { UserDocumentData } from "libs/arangodb/collections/users";
import getPageNumber from "libs/helper/get-page-number";

//helpers
import getUsers from "./get-users";
import getTotal from "./get-total";

export interface PageProps {
  users: UserDocumentData[];
  page: number;
  total: number;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const page = getPageNumber(slug[0]);
  if (page > 0) {
    const [users, total] = await Promise.all([getUsers(page), getTotal()]);
    return context.props({
      users: users,
      page: page,
      total: total,
    });
  }
  return context.notFound();
};

export default handler;
