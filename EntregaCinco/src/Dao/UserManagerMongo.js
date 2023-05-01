import { userModel } from '../db/models/user.model.js';

class UsersManager {
  async createUser(user) {
    console.log(user);
    const { username, password } = user;
    try {
      const existUser = await userModel.find({ username, password });
      if (existUser.length === 0) {
        const newUser = await userModel.create(user);
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
  }

  async loginUser(user) {
    const { username, password } = user;
    try {
      const user = await userModel.findOne({ username, password });
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default UsersManager;