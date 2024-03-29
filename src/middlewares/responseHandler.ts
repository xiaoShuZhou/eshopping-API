import { NextFunction, Request, Response } from "express";
import { ApiError } from "../errors/ApiError";
import { logger } from "../utils/logger";
import { ApiResponse } from "../responses/apiResponse";

function responseHandler<T>(result: ApiResponse<T>, _: Request, response: Response, next: NextFunction) {
  if (result instanceof ApiError) {
    const error: ApiError = result;
    logger.error("------------");
    logger.error("Error");
    logger.error(String(error.statusCode));
    logger.error(error.message);
    logger.error("------------");
    if (!error.statusCode && !error.message) {
      return response.status(500).json({ message: "Internal error" });
    }
    return response.status(error.statusCode).json({ message: error.message });
  } else {
    const success: ApiResponse<T> = result;
    logger.info('-----------');
    logger.info('Message: ',success.message);
    logger.info('Body:  ', JSON.stringify(success.data));
    logger.info('-----------');
    return response.status(success.statusCode).json({ message: success.message, data: success.data });
  }
}

export default responseHandler;
