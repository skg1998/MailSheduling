import * as errorHandler from 'api-error-handler';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import { RegisterRoutes } from "../../dist/routes";

import config from './config';
import { errorMiddleware } from './errorMiddleware';
import { notFoundHandler } from './notFoundHandler';
import { swaggerMiddleware } from './swaggerMiddleware';
import { MongoDbConnection } from './mongodb-connection';
import constants from './constants';

export default function () {
  const isDevEnvironment = constants.isDevEnvironment;
  const app: express.Express = express();
  const dbConnection = new MongoDbConnection();

  // Models
  // for (const model of config.globFiles(config.models)) {
  //   require(path.resolve(model));
  // }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(errorHandler());

  const corsMiddleware = cors({
    credentials: true,
    optionsSuccessStatus: 200,
    origin: [/http:\/\/localhost:[0-9]+/],
  });

  app.use(corsMiddleware);

  RegisterRoutes(app);

  try {
    app.use('/swagger.json', swaggerMiddleware);
    const swaggerUi = require('swagger-ui-express');
    const swaggerDoc = require(config.swaggerJsonPath);
    app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  } catch (error) {
    console.error(`swagger spec ${error}`);
  }

  // catch 404
  app.use(notFoundHandler);
  // Log other errors.

  app.use(
    (
      err: any,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => errorMiddleware(err, req, res, next)
  );

  return app;
}
