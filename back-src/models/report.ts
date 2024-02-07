import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Report extends Model {}
Report.init(
  {
    petName: { type: DataTypes.STRING, allowNull: false },
    reporterName: { type: DataTypes.STRING, allowNull: false },
    reporterPhone: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize,
    modelName: "report",
  }
);
