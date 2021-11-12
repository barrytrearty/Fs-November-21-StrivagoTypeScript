import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";

export const hostOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    if (req.user.role === "Host") {
      next();
    } else {
      next(createHttpError(403, "Hosts Only!"));
    }
  } else {
    next(createHttpError(401, "Req.user not found"));
  }
};
