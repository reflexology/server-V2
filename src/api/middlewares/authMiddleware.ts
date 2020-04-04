import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getTokenFromHeader } from '../../utils/common';
import { Errors } from '../../utils/errors';

// Authentication middleware
export default function (req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req);

  // Check for token
  if (!token) return res.status(401).json({ msg: Errors.NoToken });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY) as User;
    if (!decoded) return res.status(401).json({ msg: Errors.InvalidToken });

    // Attach user to req.user
    req.user = { ...decoded };
    next();
  } catch {
    res.status(401).json({ msg: Errors.InvalidToken });
  }
}
