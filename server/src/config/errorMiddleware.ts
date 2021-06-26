import * as express from 'express';
import { VError } from 'verror';
import constants from './constants';

let getError = (err) => ({});
// Send full error if development.
if (constants.isDevEnvironment) {
  getError = (err) => err;
}

function middleware(err: any, req: express.Request, res: express.Response) {
  let forLog = err;
  if (!(forLog instanceof Error)) {
    forLog = new Error(JSON.stringify(err));
    if (err.status || err.statusCode) {
      forLog.status = err.status || err.statusCode;
    }
  }

  res.status(err.status || err.statusCode || 500).send({
    error: getError(err),
    message: err.message || err.name,
  });
}

export const errorMiddleware: express.ErrorRequestHandler = middleware;
