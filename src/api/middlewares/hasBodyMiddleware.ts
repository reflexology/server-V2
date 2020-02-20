import { isObjectEmpty } from './../../utils/common';
import { Request, Response, NextFunction } from 'express';
import { Errors } from '../../utils/errors';

export default function hasBody(req: Request, res: Response, next: NextFunction) {
  if (isObjectEmpty(req.body)) return res.status(400).json({ msg: Errors.MissingFields });

  next();
}
