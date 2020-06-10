import { NextFunction, Request, Response } from 'express';

import { Errors } from '../../utils/errors';
import { isObjectEmpty } from './../../utils/common';

export default function hasBody(req: Request, res: Response, next: NextFunction) {
  if (isObjectEmpty(req.body)) return res.status(400).json({ msg: Errors.MissingFields });

  next();
}
