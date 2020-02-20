import { Request, Response, NextFunction } from 'express';
import { Errors } from '../../utils/errors';

export default function hasFields<T>(keys: (keyof T)[]) {
  return function(req: Request, res: Response, next: NextFunction) {
    for (const key of keys)
      if (!req.body[key]) return res.status(400).json({ msg: Errors.FieldRequired.format(key.toString()) });

    next();
  };
}
