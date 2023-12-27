import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import { BadRequest } from '../errors/errors';

function validateRequest(validateSchema: { [key: string]: Joi.ObjectSchema }) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const key in validateSchema) {
      const result = validateSchema[key].validate(req[key]);
      if (result.error) {
        throw BadRequest();
      }
    }

    next();
  };
}

export default validateRequest;
