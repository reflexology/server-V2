import { NextFunction, Request, Response } from 'express';

import { Errors } from '../../utils/errors';
import logger from '../../utils/logger';
import { getRequestUrl, isObjectEmpty } from './../../utils/common';

export default function hasBody(req: Request, res: Response, next: NextFunction) {
  if (isObjectEmpty(req.body)) {
    logger.warn(`got empty body. url: ${getRequestUrl(req)}`);
    return res.status(400).json({ msg: Errors.MissingFields });
  }

  next();
}
