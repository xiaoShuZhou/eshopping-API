import { NextFunction, Request, Response } from "express";
import { logger } from "../utils/logger";
import passport from "passport";
import { User } from "../types/User";
import { InternalServerError, ForbiddenError } from "../utils/errors/ApiError";

const isModifyingOperation = (method: string): boolean => {
  return ["POST", "PUT", "PATCH", "DELETE"].includes(method.toUpperCase());
};

const adminCheck = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "jwt",
    { session: false },
    (error: Error, user: User) => {
      if (error) {
        logger.error("Error in admin check middleware: " + error.message);
        return next(new InternalServerError("Authenticator error"));
      }
      if (
        isModifyingOperation(request.method) &&
        user &&
        user.role === "admin"
      ) {
        logger.info("Admin check: User is an admin");
        next();
      } else {
        logger.error("Admin check: User is not an admin");
        return next(new ForbiddenError("Forbidden"));
      }
    }
  )(request, response, next);
};

export default adminCheck;
