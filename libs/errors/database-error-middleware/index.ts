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
      if (error instanceof Error) throw new DatabaseError("Database error occurred");
      throw error;
    }
  };
}

export default handler;
