import { Sequelize } from "sequelize";
import "dotenv/config";
const SEQUELIZE_PRIVATE_KEY: string = process.env.DB_SECRET_KEY;
export const sequelize = new Sequelize(SEQUELIZE_PRIVATE_KEY);
