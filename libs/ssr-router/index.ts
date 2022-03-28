//node_modules
import type { GetServerSidePropsContext, GetServerSidePropsResult, Redirect } from "next";
import isString from "lodash/isString";
import isFunction from "lodash/isFunction";
import urlJoin from "proper-url-join";

//types
import type { UserDocumentData } from "libs/arangodb/collections/users";

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

interface DefaultProps<PropsType> {
  user: UserDocumentData;
  location: string;
  props: PropsType;
  notFound?: boolean;
}

export type InferType<P> = DefaultProps<P>;

class Context<PropsType = any> {
  public context: GetServerSidePropsContext;
  public path: string[];
  public user: UserDocumentData;
  private location: string;
  constructor(context: GetServerSidePropsContext, user: UserDocumentData) {
    this.context = context;
    this.user = user;
    this.path = getSlug(context);
    this.location = getLocation(this.path);
  }

  props(props: PropsType): GetServerSidePropsResult<DefaultProps<PropsType>> {
    return {
      props: {
        user: this.user,
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
        user: this.user,
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
  return (context: GetServerSidePropsContext, user: UserDocumentData): Promise<GetServerSidePropsResult<DefaultProps<any>>> => {
    const target = new Context(context, user);
    return pathfinder(path, target.path, target);
  };
}
