import { Auth, User } from "../models/models";
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
}

export { UserController };
