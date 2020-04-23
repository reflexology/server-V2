import { Request, Response, NextFunction } from 'express';
import { Errors } from '../../utils/errors';

export default function hasFields<T>(keys: (keyof T)[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (Array.isArray(req.body))
      for (const data of req.body) {
        for (const key of keys)
          if (!data[key]) return res.status(400).json({ msg: Errors.FieldRequired.format(key.toString()) });
      }
    else
      for (const key of keys)
        if (!req.body[key]) return res.status(400).json({ msg: Errors.FieldRequired.format(key.toString()) });

    next();
  };
}
