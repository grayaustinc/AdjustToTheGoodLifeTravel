//libs
import { Middleware } from "libs/get-static-props";

//logger
import logger from "libs/logger";

//errors
import errors, { NotFoundError, ServerError } from "libs/errors";

const middleware: Middleware<any> = async (_, next) => {
  try {
    return await next();
  } catch (error) {
    if (error instanceof NotFoundError) {
      return {
        notFound: true,
        revalidate: 30,
      };
    } else if (errors.some((ErrorInstance) => error instanceof ErrorInstance)) {
      throw error;
    } else {
      logger.log("error", error);
      throw new ServerError("An unknown error occurred!");
    }
  }
};

export default middleware;
