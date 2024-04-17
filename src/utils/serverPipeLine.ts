import express from "express";
import routes from "./routes";
import cors from "cors";

import { requestLogger } from "../middlewares/requestLogger";
import passport from "passport";
import { jwtStrategy } from "./passport";
import responseHandler from "../middlewares/responseHandler";

function serverPipeline() {
  const app = express();
  app.use(cors());
  app.use(express.static("dist"));
  app.use(express.json());
  app.use(requestLogger);
  // app.use(passport.initialize());
  // passport.use(jwtStrategy);
  routes(app);
  app.use(responseHandler);

  return app;
}

export default serverPipeline;
