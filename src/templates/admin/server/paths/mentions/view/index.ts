//router
import { PathHandler } from "libs/ssr-router";

//libs
import type { MentionDocumentData } from "libs/arangodb/collections/mentions";
import getPageNumber from "libs/helper/get-page-number";

//helpers
import getMentions from "./get-mentions";
import getTotal from "./get-total";

export interface PageProps {
  mentions: MentionDocumentData[];
  page: number;
  total: number;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const page = getPageNumber(slug[0]);
  if (page > 0) {
    const [mentions, total] = await Promise.all([getMentions(page), getTotal()]);
    return context.props({
      mentions: mentions,
      page: page,
      total: total,
    });
  }
  return context.notFound();
};

export default handler;
