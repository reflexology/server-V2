import { NextFunction, Request, Response } from 'express';

import { Errors } from '../../utils/errors';
import logger from '../../utils/logger';

export default function hasFields<T>(keys: (keyof T)[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (Array.isArray(req.body))
      for (const data of req.body) {
        for (const key of keys)
          if (!data[key]) {
            logger.warn(`key ${key} is missing in ${req.body}`);
            return res.status(400).json({ msg: Errors.FieldRequired.format(key.toString()) });
          }
      }
    else
      for (const key of keys)
        if (!req.body[key]) {
          logger.warn(`key ${key} is missing in ${req.body}`);
          return res.status(400).json({ msg: Errors.FieldRequired.format(key.toString()) });
        }

    next();
  };
}
