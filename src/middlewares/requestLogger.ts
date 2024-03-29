import {Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";


const requestLogger = (request:Request, response:Response, next: NextFunction) => {
  logger.info('-----------');
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('-----------');
  next();
}


export { requestLogger };