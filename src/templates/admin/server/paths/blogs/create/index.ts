//node_modules
import isString from "lodash/isString";

//libs
import { BlogDocumentData } from "libs/arangodb/collections/blogs";
import { DraftDocumentData } from "libs/arangodb/collections/drafts";

//router
import { PathHandler } from "libs/ssr-router";

//helpers
import getBlog from "./get-blog";
import getLatestDraft from "./get-latest-draft";
import createDraft from "./create-draft";
import createBlog from "./create-blog";

export interface PageProps {
  blog: BlogDocumentData;
  draft: DraftDocumentData;
}

const handler: PathHandler<PageProps> = async (slug, context) => {
  const key = slug[0];
  if (isString(key)) {
    const blog = await getBlog(key);
    if (blog) {
      //Get latest draft
      const latestDraft = await getLatestDraft(blog);
      if (latestDraft) {
        return context.props({
          blog: blog,
          draft: latestDraft,
        });
      }
      //Create a new draft if latest does not exist
      const draft = await createDraft(blog, latestDraft);
      return context.props({ blog: blog, draft: draft });
    }
    return context.notFound();
  }
  const blog = await createBlog();
  return context.redirect({
    destination: `/admin/blogs/create/${blog._key}/`,
    permanent: false,
  });
};

export default handler;
