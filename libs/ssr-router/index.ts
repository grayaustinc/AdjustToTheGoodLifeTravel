import type { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import isString from "lodash/isString";
import isFunction from "lodash/isFunction";
import urlJoin from "proper-url-join";

function getSlug(context: GetServerSidePropsContext) {
  const slug = context.params?.slug;
  if (slug) {
    if (isString(slug)) {
      return [slug];
    }
    return slug;
  }
  return [];
}

function getLocation(slug: string[]) {
  return urlJoin(slug.join("/"), { trailingSlash: true });
}

interface Context<T> {
  context: GetServerSidePropsContext;
  path: string[];
  props: (props: T) => GetServerSidePropsResult<T>;
  redirect: (redirect: Redirect) => GetServerSidePropsResult<any>;
  notFound: () => GetServerSidePropsResult<any>;
}

export type PathHandler<T> = (slug: string[], context: Context<T>) => Promise<GetServerSidePropsResult<any>>;
export type Path = { [key: string]: Path | PathHandler<any> };

function createContext(context: GetServerSidePropsContext): Context<any> {
  const slug = getSlug(context);
  const location = getLocation(slug);

  function propsFunction(props: any = null): GetServerSidePropsResult<any> {
    return {
      props: {
        location: location,
        props: props,
      },
    };
  }

  function redirectFunction(redirect: Redirect): GetServerSidePropsResult<any> {
    return {
      redirect: redirect,
    };
  }

  function notFoundFunction(): GetServerSidePropsResult<any> {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return {
    context: context,
    path: getSlug(context),
    props: propsFunction,
    redirect: redirectFunction,
    notFound: notFoundFunction,
  };
}

async function pathfinder(path: Path, slug: string[], context: Context<any>): Promise<GetServerSidePropsResult<any>> {
  const key = slug[0];
  const next = path[key];
  if (next) {
    if (isFunction(next)) {
      return next(slug.slice(1), context);
    }
    return pathfinder(next, slug.slice(1), context);
  }
  return context.notFound();
}

export default function (path: Path) {
  return (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const target = createContext(context);
    return pathfinder(path, target.path, target);
  };
}
