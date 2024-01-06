import { Sequelize } from "sequelize";
const SEQUELIZE_PRIVATE_KEY: string =
  "postgres://fhzfebtg:WDdeunGPImrpsUQ-qOZtw0ioZGGH-Efp@silly.db.elephantsql.com/fhzfebtg";
export const sequelize = new Sequelize(SEQUELIZE_PRIVATE_KEY);
