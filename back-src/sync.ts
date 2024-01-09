import { sequelize } from "./db/index";

sequelize.sync({ force: true }).then((res) => {
  console.log(res);
});
