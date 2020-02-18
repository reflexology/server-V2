import User, { IUser } from './../models/userModel';

export function createUser(user: IUser) {
  return User.create(user);
}

export function getUserById(id: string) {
  return User.findById(id);
}

export function getUserByUsername(username: string) {
  return User.findOne({ username });
}
