import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { logger } from "./utils/logger";
import { config } from "./utils/config";
import productsRouter from "./routers/productsRouter";
import categoriesRouter from "./routers/categoriesRouter";
import userRouter from "./routers/userRouter";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";

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

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
