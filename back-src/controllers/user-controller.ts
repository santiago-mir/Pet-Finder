import { where } from "sequelize";
import { User } from "../models/models";
class UserController {
  public static async createUser(userName: string, email: string) {
    if (!userName || !email) {
      throw new Error("userController: nombre o email invalidos");
    } else {
      const newUser = await User.findOrCreate({
        // crea o encuentra al user en la DB
        where: { email: email },
        defaults: {
          firstName: userName,
          email,
        },
      });
      return newUser;
    }
  }
  public static async updateUserData(
    userId: number,
    userName: string,
    city: string
  ) {
    if (!userName || !city) {
      throw new Error("userController: name o city invalidos");
    } else {
      const updatedUser = await User.update(
        { firstName: userName, city },
        {
          where: {
            id: userId,
          },
        }
      );
      return updatedUser;
    }
  }
  public static async getOneUser(userId: string) {
    if (!userId) {
      throw new Error("userController: userId invalido o incorrecto");
    } else {
      const user = await User.findByPk(userId);
      return user;
    }
  }
}

export { UserController };
