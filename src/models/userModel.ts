import { Document, model, Schema } from 'mongoose';

import Consts from '../utils/consts';
import { Errors } from '../utils/errors';

export interface IUser {
  username: string;
  password: string;
}

export interface IUserDocument extends Document, IUser {}

export const UserSchema = new Schema<IUserDocument>({
  username: {
    type: String,
    required: [true, Errors.UserNameRequired],
    trim: true,
    unique: true
  },
  password: { type: String, required: [true, Errors.PasswordRequired], trim: true }
});

const User = model<IUserDocument>(Consts.db.userTableName, UserSchema, Consts.db.userTableName);

export default User;
