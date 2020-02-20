import User, { IUser, IUserDocument } from '../models/userModel';
import BaseRepository from './baseRepository';

class UserRepository extends BaseRepository<IUserDocument, IUser> {
  constructor() {
    super(User);
  }

  getOneByUsername(username: string) {
    return User.findOne({ username });
  }
}

export default UserRepository;
