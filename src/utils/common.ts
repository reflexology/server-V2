import { Request } from 'express';
import bcrypt from 'bcryptjs';

export const getTokenFromHeader = (req: Request) => {
  if (
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  ) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password.trim(), salt);
};

export const isObjectEmpty = (obj: {}) => Object.entries(obj).length === 0 && obj.constructor === Object;
