import express from "express";
import createHttpError from "http-errors";

import { UserModel } from "./model";
import { JWTAuthenticate } from "../auth/tools";
import AccomodationSchema from "../accomodation/schema";
import { JWTAuthMiddleware } from "../auth/token";
import { hostOnlyMiddleware } from "../auth/hostOnly";

const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send("Missing email or password");
    }

    const newUser = new UserModel(req.body);
    const { _id } = await newUser.save();
    const accessToken = await JWTAuthenticate(newUser);
    res.status(201).send({ ...newUser.toObject(), accessToken });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).send("Missing email or password");
    }

    const user = await UserModel.checkCredentials(email, password);

    if (user) {
      const accessToken = await JWTAuthenticate(user);

      res.status(200).send({ accessToken });
    } else {
      next(createHttpError(401, "Credentials are not ok!"));
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get(
  "/me/accomodation",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      if (req.user) {
        console.log(req.user._id.toString());
        const accomodations = await AccomodationSchema.find({
          host: req.user._id.toString(),
        });

        res.status(200).send(accomodations);
      } else {
        next(createHttpError(401, "Req.user not found!"));
      }
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.get("/me", JWTAuthMiddleware, async (req, res, next) => {
  try {
    console.log(req.user);
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

export default usersRouter;
