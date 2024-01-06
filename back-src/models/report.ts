import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db";

export class Report extends Model {}
Report.init(
  {
    reporterName: { type: DataTypes.STRING, allowNull: false },
    reporterPhone: { type: DataTypes.NUMBER, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "report",
  }
);
