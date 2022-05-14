import { DocumentDefinition } from "mongoose";
import User, { UserDocument } from "../models/user.model";


class UserService {
  static save(user: DocumentDefinition<UserDocument>) {
       User.create(user);
  }

  static async findUserById(id: string) {
      return await User.findById({ _id: id });
  }
  
}

export default UserService;