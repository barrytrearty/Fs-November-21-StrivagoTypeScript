import { model, Model } from "mongoose";
import { UserSchema } from "./schema";
import { User } from "../types/index.d.";

// interface User {}

export interface iUser extends Model<User> {
  checkCredentials(email: string, plainPW: string): Promise<Array<User>>;
}

export const UserModel: iUser = model<User, iUser>("users", UserSchema);
