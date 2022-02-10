//node_modules
import isString from "lodash/isString";

//libs
import { MentionDocumentData } from "libs/arangodb/collections/mentions";

//router
import { PathHandler } from "libs/ssr-router";

//helpers
import getMention from "./get-mention";

export interface PageProps {
  mention?: MentionDocumentData;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const key = slug[0];
  if (isString(key)) {
    const mention = await getMention(key);
    if (mention) {
      return context.props({
        mention: mention,
      });
    }
    return context.notFound();
  }
  return context.props({});
};

export default handler;
