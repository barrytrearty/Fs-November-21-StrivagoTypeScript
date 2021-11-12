import { Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  role: string;
  _id: string;
  checkCredentionals(): string;
}

// export interface User {
//   email: string;
//   password: string;
//   role: string;
//   _id: string;
//   checkCredentionals(): string;
// }

export interface TokenInterface {
  _id: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}
