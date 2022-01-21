import { GetStaticPropsContext, GetStaticProps, GetStaticPropsResult } from "next";

type NextFunction<T> = () => Promise<GetStaticPropsResult<T>>;

export type Middleware<T> = (context: GetStaticPropsContext, next: NextFunction<T>) => Promise<GetStaticPropsResult<T>>;

class StaticProps<T> {
  private middlewares: Middleware<T>[] = [];

  use(middleware: Middleware<T>) {
    this.middlewares.push(middleware);
  }

  run(callback: GetStaticProps<T>) {
    return (context: GetStaticPropsContext) => {
      const runner = async (index: number): Promise<GetStaticPropsResult<T>> => {
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

export default function crateGetStaticPropsHandler<T = {}>() {
  return new StaticProps<T>();
}
