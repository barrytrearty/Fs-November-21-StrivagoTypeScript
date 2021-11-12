import createHttpError from "http-errors";
import { UserModel } from "../users/model";
import { verifyJWT } from "./tools";
import { Request, Response, NextFunction } from "express";

export const JWTAuthMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  // 1. Check if Authorization header is received, if it is not --> 401
  if (!req.headers.authorization) {
    next(
      createHttpError(401, "Please provide credentials in Authorization header")
    );
  } else {
    try {
      // 2. If we receive Authorization header we extract the token from the header

      const token = req.headers.authorization.replace("Bearer ", "");

      // 3. Verify the token, if everything goes fine we are getting back the _id of the logged in user, otherwise an error will be thrown by jwt library

      const decodedToken: any = await verifyJWT(token);

      console.log("DECODED TOKEN ", decodedToken);

      // 4. Find the user in db and attach him/her to the request object
      const user = await UserModel.findById(decodedToken._id);

      if (user) {
        req.user = user;
        next();
      } else {
        next(createHttpError(404, "User not found!"));
      }
    } catch (error) {
      next(createHttpError(401, "Token not valid!"));
    }
  }
};
