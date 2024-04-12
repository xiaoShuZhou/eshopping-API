import mongoose from "mongoose";
import { config } from "./config";
import { logger } from "./logger";

async function databaseConnection() {
  mongoose.set("strictQuery", false);
  if (config.MONGODB_URI) {
    logger.info("connecting to", config.MONGODB_URI);
    await mongoose
      .connect(config.MONGODB_URI)
      .then(() => {
        logger.info("connected to MongoDB");
      })
      .catch((error) => {
        logger.error("error connection to MongoDB: " + error.message);
        process.exit(1);
      });
  } else {
    logger.error("MongoDB URI undefined");
    process.exit(1);
  }
}

export default databaseConnection;
