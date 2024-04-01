import { logger } from "./utils/logger";
import { config } from "./utils/config";
import serverPipeline from "./utils/server";
import db from "./utils/db";

const app = serverPipeline();
app.listen(config.PORT, async () => {
  logger.info(`App is running at http://localhost:${config.PORT}`);
  await db();
});