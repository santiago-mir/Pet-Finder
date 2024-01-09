import { Auth, User } from "../models/models";
import { getSHA256ofString } from "../utilities";

class AuthController {
  public static async createAuth(user: User, email: string, password: string) {
    if (!email || !password || !user) {
      throw new Error("email, password o user invalidos");
    } else {
      const newAuth = await Auth.findOrCreate({
        where: { user_id: user.get("id") },
        defaults: {
          email,
          password: getSHA256ofString(password), // pass hasheada
          user_id: user.get("id"),
        },
      });
      return newAuth;
    }
  }
  public static async getToken(email: string, password: string) {
    if (!email || !password) {
      throw new Error("auth controller: email o password invalidos");
    }
    const hashPass = getSHA256ofString(password);
    const auth = await Auth.findOne({
      where: {
        email,
        password: hashPass,
      },
    });
    return auth;
  }
}

export { AuthController };
