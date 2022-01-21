//node_modules
import isString from "lodash/isString";

//libs
import createServerSideHandler from "libs/get-server-side-props";
import LoginRedirectMiddleware from "libs/middleware/ssr/login-redirect";

//locals
import getBlog from "./get-blog";
import getLatestDraft from "./get-latest-draft";
import createDraft from "./create-draft";

import type { PageProps } from "../types";

const handler = createServerSideHandler<PageProps>();

handler.use(LoginRedirectMiddleware);

const getServerSideProps = handler.run(async (context) => {
  const key = context.query.key;
  if (isString(key)) {
    const blog = await getBlog(key);
    if (blog) {
      //Get latest draft
      const latestDraft = await getLatestDraft(blog);
      if (latestDraft) {
        return {
          props: {
            blog: blog,
            draft: latestDraft,
          },
        };
      }
      //Create a new draft if latest does not exist
      const draft = await createDraft(blog, latestDraft);
      return {
        props: {
          blog: blog,
          draft: draft,
        },
      };
    }
  }
  return {
    notFound: true,
  };
});

export default getServerSideProps;
