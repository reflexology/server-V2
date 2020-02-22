import { Request, Response, NextFunction } from 'express-serve-static-core';
import mongoose from 'mongoose';
import logger from '../../utils/logger';
import { Errors } from '../../utils/errors';

// Error middleware

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function(err: any, req: Request, res: Response<ResErr>, next: NextFunction) {
  if (err && err instanceof mongoose.Error.ValidationError && err.errors) {
    const firstError = err.errors[Object.keys(err.errors)[0]];
    if (firstError instanceof mongoose.Error.CastError)
      return res.status(400).json({ msg: Errors.InvalidValue + firstError.path });

    return res.status(400).json({ msg: firstError.message });
  }

  logger.error('Exception caught in error middleware - ', err);
  res.status(500).end();
}
