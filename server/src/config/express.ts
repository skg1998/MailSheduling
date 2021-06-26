import * as errorHandler from 'api-error-handler';
import * as cors from 'cors';
import * as express from 'express';
import * as path from 'path';
import { RegisterRoutes } from '../../dist/routes';

import config from './config';
import { errorMiddleware } from './errorMiddleware';
import { notFoundHandler } from './notFoundHandler';
import { swaggerMiddleware } from './swaggerMiddleware';
import { MongoDbConnection } from './mongodb-connection';
import constants from './constants';
import * as scheduler from 'node-schedule';
import { CronService } from '../services';

export default function () {
  const app: express.Express = express();
  const dbConnection = new MongoDbConnection();
  const cronService = new CronService();

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
