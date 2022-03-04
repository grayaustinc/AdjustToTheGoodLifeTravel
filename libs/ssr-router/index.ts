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

class Context<PropsType = any> {
  public context: GetServerSidePropsContext;
  public path: string[];
  private location: string;
  constructor(context: GetServerSidePropsContext) {
    this.context = context;
    this.path = getSlug(context);
    this.location = getLocation(this.path);
  }

  props(props: PropsType): GetServerSidePropsResult<{ location: string; props: PropsType }> {
    return {
      props: {
        location: this.location,
        props: props,
      },
    };
  }

  redirect(redirect: Redirect): GetServerSidePropsResult<any> {
    return {
      redirect: redirect,
    };
  }

  notFound(): GetServerSidePropsResult<any> {
    return {
      props: {
        notFound: true,
      },
    };
  }
}

export type PathHandler<T> = (slug: string[], context: Context<T>) => Promise<GetServerSidePropsResult<any>>;
export type Path = { [key: string]: Path | PathHandler<any> };

async function pathfinder<PropsType>(path: Path, slug: string[], context: Context<PropsType>): Promise<GetServerSidePropsResult<PropsType>> {
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

export default function router(path: Path) {
  return (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<any>> => {
    const target = new Context(context);
    return pathfinder(path, target.path, target);
  };
}
