import bcrypt from 'bcryptjs';
import { Request } from 'express';
import moment from 'moment';

export const getTokenFromHeader = (req: Request<any, any, any, any>) => {
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

export const getDurationFromNow = (start: moment.Moment) => {
  const now = moment.utc();

  return moment.duration(now.diff(start));
};

export const convertDateToAge = (date: Date) => {
  const utcDate = moment.utc(date, 'DD/MM/YYYY');
  const diff = getDurationFromNow(utcDate);

  return diff.isValid() && !utcDate.isAfter(moment()) ? diff.years() + '.' + diff.months() : '';
};

export const isObjectEmpty = (obj: Record<string, unknown>) =>
  Object.entries(obj).length === 0 && obj.constructor === Object;

export const getRequestUrl = (request: Request) => request.protocol + '://' + request.get('host') + request.originalUrl;
