import * as express from "express";
import "./dev";
import { sequelize } from "./db";
import { User, Auth, Pet, Report } from "./models/models";
import * as cors from "cors";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import { authMiddleware } from "./utilities";
import { AuthController } from "./controllers/auth-controller";
import { UserController } from "./controllers/user-controller";
const port = process.env.BACK_PORT;
const SECRET_JWT = process.env.SECRET;
const app = express();
app.use(cors());
app.use(express.json());
// sign-up

app.post("/auth", async (req, res) => {
  const { password, confirmPassword } = req.body;
  try {
    const { name, email, password, confirmPassword } = req.body;
    if (password != confirmPassword) {
      res.status(400).json({ error: "las contraseñas no coinciden" });
    } else {
      const [user, userCreated] = await UserController.createUser(name, email);
      const auth = await AuthController.createAuth(user, email, password);
      res.json(user);
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const auth = await AuthController.getToken(email, password);
  if (auth) {
    const token = jwt.sign({ id: auth.get("user_id") }, SECRET_JWT);
    res.json({ token });
  } else {
    res.status(404).json({ error: "email o password incorrecto" });
  }
});

app.put("/menu/update-data", authMiddleware, async (req, res) => {
  const { name, city } = req.body;
  const userId = req["._user"].id;
  const updatedUser = await UserController.updateUserData(userId, name, city);
  res.json(updatedUser);
});
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  const route = path.resolve(__dirname, "../dist/index.html");
  res.sendFile(route);
});

app.listen(port, () => console.log("escuchando puerto" + port));
