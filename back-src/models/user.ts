import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class User extends Model {}
User.init(
  {
    firstName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "user",
  }
);
