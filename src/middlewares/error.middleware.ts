import { NextFunction, Request, Response } from 'express';

import logger from '@common/logger.loader';

import { AppError, BaseError } from '../errors/errors';

function errorMiddleware(
  err: AppError | any,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) {
  if (!(err instanceof AppError)) {
    logger.error(JSON.stringify(err));
    err = BaseError();
  }
  res.status(err.status).send(err);
}

export default errorMiddleware;
