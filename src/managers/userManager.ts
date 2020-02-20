import { IUser } from './../models/userModel';
import { hashPassword } from './../utils/common';
import { userRepository } from '../repositories';

export function getUserByUsername(username: string) {
  return userRepository.getOneByUsername(username);
}

export function getUserById(id: string) {
  return userRepository.getOneById(id);
}

export async function createUser(user: IUser) {
  user.password = await hashPassword(user.password);

  return userRepository.create(user);
}
