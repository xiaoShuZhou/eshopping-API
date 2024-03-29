import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";


import { Payload, User } from "../types/User";
import dotenv from "dotenv";

import userService from "../services/userService";
import { UserDocument } from "../models/User";

dotenv.config({ path: ".env" });
const JWT_SECRET = process.env.JWT_SECRET as string;
console.log(JWT_SECRET, "jwt");

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: Payload, done: any) => {
    try {
      console.log(payload, "payload");
      const userEmail = payload.email;
      const foundUser:User = await userService.findUserByEmail(userEmail) as User;
      done(null, foundUser); 
    } catch (error) {
      done(error, false);
    }
  }
);