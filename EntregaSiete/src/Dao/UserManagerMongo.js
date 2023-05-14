import { userModel } from '../db/models/user.model.js';

class UsersManager {
  async createUser(user) {
    const { email, password } = user;
    try {
      const existUser = await userModel.find({ email, password });
      if (existUser.length === 0) {
        const newUser = await userModel.create(user);
        return newUser;
      } else {
        return null;
      }
    } catch (error) {
        throw new Error(error);
    }
  }

  async loginUser(user) {
    const usuario = {email :user.userDB, 
                     password: user.pass}
    try {
      const userLog = await userModel.findOne(usuario);
      return userLog;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUserById(id) {
    try {
      const user = await userModel.findById(id);
      return user;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}

export default UsersManager;