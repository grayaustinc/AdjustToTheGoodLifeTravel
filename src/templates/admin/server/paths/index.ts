//libs
import type { Path, PathHandler } from "libs/ssr-router";

/** Paths **/
//blogs
import blogsCreateHandler from "./blogs/create";
import blogsViewHandler from "./blogs/view";

//locations
import locationsCreateHandler from "./locations/create";
import locationsViewHandler from "./locations/view";

//mentions
import mentionsCreateHandler from "./mentions/create";
import mentionsViewHandler from "./mentions/view";

//testimonials
import testimonialsCreateHandler from "./testimonials/create";
import testimonialsViewHandler from "./testimonials/view";

//users
import usersCreateHandler from "./users/create";
import usersViewHandler from "./users/view";

const getEmptyPath: PathHandler<null> = async (_, context) => context.props(null);
const getRedirect =
  (destination: string): PathHandler<any> =>
  async (_, context) =>
    context.redirect({ permanent: true, destination: destination });

const paths: Path = {
  dashboard: getEmptyPath,
  account: {
    "change-password": getEmptyPath,
  },
  blogs: {
    undefined: getRedirect("/admin/blogs/view/1/"),
    view: blogsViewHandler,
    create: blogsCreateHandler,
  },
  locations: {
    undefined: getRedirect("/admin/locations/view/1/"),
    view: locationsViewHandler,
    create: locationsCreateHandler,
  },
  mentions: {
    undefined: getRedirect("/admin/mentions/view/1/"),
    view: mentionsViewHandler,
    create: mentionsCreateHandler,
  },
  testimonials: {
    undefined: getRedirect("/admin/testimonials/view/1/"),
    view: testimonialsViewHandler,
    create: testimonialsCreateHandler,
  },
  users: {
    undefined: getRedirect("/admin/users/view/1/"),
    view: usersViewHandler,
    create: usersCreateHandler,
  },
};

export default paths;
