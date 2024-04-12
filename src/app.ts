import { logger } from "./utils/logger";
import { config } from "./utils/config";
import serverPipeline from "./utils/serverPipeLine";
import databaseConnection from "./utils/databaseConnection";

const app = serverPipeline();
app.listen(config.PORT, async () => {
  logger.info(`App is running at http://localhost:${config.PORT}`);
  await databaseConnection();
});