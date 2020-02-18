import { IUser } from './../models/userModel';
import { hashPassword } from './../utils/common';
import { userRepository } from '../repositories';

export function getUserByUsername(username: string) {
  return userRepository.getUserByUsername(username);
}

export function getUserById(id: string) {
  return userRepository.getUserById(id);
}

export async function createUser(user: IUser) {
  user.password = await hashPassword(user.password);

  return userRepository.createUser(user);
}
