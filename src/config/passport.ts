import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";


import { Payload } from "../types/User";
import dotenv from "dotenv";

import userService from "../services/userService";

dotenv.config({ path: ".env" });
const JWT_SECRET = process.env.JWT_SECRET as string;
console.log(JWT_SECRET, "jwt");

export const jwtStrategy = new JwtStrategy(
  {
    // get token front-end
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: Payload, done: any) => {
    console.log(payload, "payload");
    const userEmail = payload.email;
    try {
      const foundUser = await userService.findUserByEmail(userEmail);
      done(null, foundUser);
    } catch (error) {
      done(error, false);
    }
  }
);