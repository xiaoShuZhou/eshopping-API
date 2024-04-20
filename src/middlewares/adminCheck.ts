// if user is an admin => create category/ product
import { NextFunction, Request, Response } from "express";
import { UserDocument } from "../models/User";
import { ForbiddenError } from "../utils/errors/ApiError";

const adminCheck = (request: Request, _: Response, next: NextFunction) => {
  const userInformation = request.user as UserDocument;
  if (userInformation.role === "admin") {
    next();
    return;
  }
  next(new ForbiddenError("You do not have permission."));
};

export default adminCheck;