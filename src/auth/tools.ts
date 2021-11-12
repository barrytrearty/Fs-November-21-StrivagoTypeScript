import jwt from "jsonwebtoken";
import { User } from "../types/index.d.";

process.env.TS_NODE_DEV && require("dotenv").config();

if (!process.env.JWT_SECRET) {
  throw new Error("No MongoDB uri defined");
}

export const JWTAuthenticate = async (user: any) => {
  const accessToken = await generateJWT({ _id: user._id });

  return accessToken;
};

const generateJWT = (payload: any) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.JWT_SECRET!,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

export const verifyJWT = (token: any) =>
  new Promise((res, rej) =>
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err: any, decodedToken: any) => {
        if (err) rej(err);
        else res(decodedToken);
      }
    )
  );
