import { GetServerSideProps, GetServerSidePropsResult, GetServerSidePropsContext } from "next";

type NextFunction<T> = () => Promise<GetServerSidePropsResult<T>>;

export type Middleware<T> = (context: GetServerSidePropsContext, next: NextFunction<T>) => Promise<GetServerSidePropsResult<T>>;

class ServerSidePropsHandler<T> {
  private middlewares: Middleware<T>[] = [];

  use(middleware: Middleware<T>) {
    this.middlewares.push(middleware);
  }

  run(callback: GetServerSideProps<T>) {
    return (context: GetServerSidePropsContext) => {
      const runner = async (index: number): Promise<GetServerSidePropsResult<T>> => {
        if (index >= this.middlewares.length) {
          return callback(context);
        } else {
          const middleware = this.middlewares[index];
          return middleware(context, () => runner(index + 1));
        }
      };
      return runner(0);
    };
  }
}

export default function crateGetServerSideHandler<T = {}>() {
  return new ServerSidePropsHandler<T>();
}
