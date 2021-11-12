import express from "express";
import createHttpError from "http-errors";

import AccomodationSchema from "./schema";
import { JWTAuthenticate } from "../auth/tools";
import { JWTAuthMiddleware } from "../auth/token";
import { hostOnlyMiddleware } from "../auth/hostOnly";

const accomodationRouter = express.Router();

accomodationRouter.get("/", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const accomodation = await AccomodationSchema.find();
    res.send(accomodation);
  } catch (error) {
    next(error);
  }
});

accomodationRouter.get("/:id", JWTAuthMiddleware, async (req, res, next) => {
  try {
    const id = req.params.id;
    const accomodation = await AccomodationSchema.findById(id);
    if (accomodation) {
      res.send(accomodation);
    } else {
      next(createHttpError(404, `accomodation with id ${id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

accomodationRouter.post(
  "/",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      // console.log(req.user._id.toString());
      if (req.user) {
        const newAccomodation = new AccomodationSchema({
          ...req.body,
          host: [req.user._id.toString()],
        });
        const { _id } = await newAccomodation.save(); // this is where the interaction with the db/collection happens

        res.status(201).send({ _id });
      } else {
        next(createHttpError(401, "Req.user not found"));
      }
    } catch (error) {
      next(error);
    }
  }
);

accomodationRouter.put(
  "/:_id",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params._id;
      const modifiedAccomodation = await AccomodationSchema.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true, // returns the modified user
        }
      );

      if (modifiedAccomodation) {
        res.send(modifiedAccomodation);
      } else {
        next(createHttpError(404, `Accomodation with id ${id} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

accomodationRouter.delete(
  "/:_id",
  JWTAuthMiddleware,
  hostOnlyMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params._id;

      const deletedAccomodation = await AccomodationSchema.findByIdAndDelete(
        id
      );

      if (deletedAccomodation) {
        res.status(204).send();
      } else {
        next(createHttpError(404, `Accomodation with id ${id} not found!`));
      }
    } catch (error) {
      next(error);
    }
  }
);

export default accomodationRouter;
