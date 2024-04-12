import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";


import { Payload, User } from "../types/User";
import dotenv from "dotenv";

import userService from "../services/userService";
import { logger } from "./logger";

dotenv.config({ path: ".env" });
const JWT_SECRET = process.env.JWT_SECRET as string;
logger.info(JWT_SECRET, "jwt");

export const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: Payload, done: any) => {
    try {
      logger.info(JSON.stringify(payload), "payload");
      const userEmail = payload.email;
      const foundUser:User = await userService.findUserByEmail(userEmail) as User;
      done(null, foundUser); 
    } catch (error) {
      done(error, false);
    }
  }
);