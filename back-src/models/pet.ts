import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Pet extends Model {}
Pet.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    lost: { type: DataTypes.BOOLEAN, allowNull: false },
    img_URL: { type: DataTypes.STRING, allowNull: false },
    last_lat: { type: DataTypes.STRING, allowNull: true },
    last_lng: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "pet",
  }
);
