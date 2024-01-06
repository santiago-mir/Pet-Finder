import { User } from "./user";
import { Auth } from "./auth";
import { Pet } from "./pet";
import { Report } from "./report";

User.hasMany(Report);
User.hasMany(Pet);
Pet.belongsTo(User);
Report.belongsTo(User);

export { User, Auth, Pet, Report };
