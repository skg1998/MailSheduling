import * as errorHandler from "api-error-handler";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as health from "express-ping";
import * as morgan from "morgan";
import * as path from "path";
import "source-map-support/register";
// import { RegisterRoutes } from "../routes";
import { RegisterRoutes } from "../../dist/routes";
import config from "./config";
import { errorMiddleware } from "./errorMiddleware";
import { notFoundHandler } from "./notFoundHandler";
import { swaggerMiddleware } from "./swaggerMiddleware";
import { logger } from "../logging/logging";
import { IncomingMessage, ServerResponse } from "http";
import { MongoDbConnection } from "./mongodb-connection";
import constants from "./constants";

export default function(development = constants.isDevEnvironment) {
  const app: express.Express = express();
  const dbConnection = new MongoDbConnection();

  // Models
  for (const model of config.globFiles(config.models)) {
    require(path.resolve(model));
  }

  const morganOptions: morgan.Options<IncomingMessage, ServerResponse> = {};
  // Skip non error codes for production systems.
  if (!development) {
    morganOptions.skip = (req, res) => res.statusCode < 400;
  } else {
    //  Skip ping end points for production to prevent flooding of logs from load balancer.
    morganOptions.skip = (req, res) => req.url.endsWith("/ping");
  }
  app.use(
    morgan(
      ":date[iso] - :method :url :status :response-time ms - :res[content-length]",
      morganOptions
    )
  );
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(health.ping());
  app.use(errorHandler());

  const corsMiddleware = cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: [
      /http:\/\/localhost:[0-9]+/, // Local host on any port - for development
      /**
       * Add other patterns here to allow credentials to be set.
       */
    ],
  });

  app.use(corsMiddleware);

  RegisterRoutes(app);

  if (development) {
    const rs = app._router.stack.filter((s) => s.route).map((r) => r.route);
    if (rs.length === 0) {
      logger.warn("No routes attached");
    } else {
      rs.forEach((r) => {
        logger.info(
          `Route attached: ${r.stack[0].method.toUpperCase()} ${r.path}`
        );
      });
    }
  }

  try {
    app.use("/swagger.json", swaggerMiddleware);
    const swaggerUi = require('swagger-ui-express');
    const swaggerDoc = require(config.swaggerJsonPath);
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  } catch (error) {
    logger.error(`swagger spec ${error}`);
  }

  // catch 404
  app.use(notFoundHandler);
  // Log other errors.
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => errorMiddleware(err, req, res, next));

  return app;
}
