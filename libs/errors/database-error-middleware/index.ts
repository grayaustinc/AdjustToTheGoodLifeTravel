//errors
import { DatabaseError } from "libs/errors";

//logger
import logger from "libs/logger";

function handler<T extends (...args: any[]) => any>(callback: T) {
  return function wrapper(...args: Parameters<T>): ReturnType<T> {
    try {
      return callback(...args);
    } catch (error) {
      logger.log("error", error);
      throw new DatabaseError("Database error occurred");
    }
  };
}

export default handler;
