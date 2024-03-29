import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { logger } from "./utils/logger";
import { config } from "./utils/config";
import productsRouter from "./routers/productsRouter";
import categoriesRouter from "./routers/categoriesRouter";
import userRouter from "./routers/userRouter";
import orderRouter from "./routers/orderRouter";
import {
  requestLogger,
} from "./middlewares/requestLogger";
import responseHandler from "./middlewares/responseHandler";
import passport from "passport";
import { jwtStrategy } from "./config/passport";

mongoose.set("strictQuery", false);
const app = express();
if (config.MONGODB_URI) {
  logger.info("connecting to", config.MONGODB_URI);
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      logger.info("connected to MongoDB");
    })
    .catch((error) => {
      logger.error("error connection to MongoDB: " + error.message);
    });
} else {
  logger.error("MongoDB URI undefined");
}

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);
app.use(passport.initialize());
passport.use(jwtStrategy);

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

app.use(responseHandler);

export default app;
