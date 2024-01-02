import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class User extends Model {}
User.init(
  {
    fullName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "user",
  }
);
