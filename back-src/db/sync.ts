import { sequelize } from "./index";
function sync() {
  sequelize.sync({ force: true }).then((res) => {
    console.log(res);
  });
}

sync();
