import { Auth, User } from "../models/models";
class UserController {
  public static async createUser(userName: string, email: string) {
    if (!userName || !email) {
      console.log(userName, email);
      throw new Error("nombre o email invalidos");
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
}

export { UserController };
