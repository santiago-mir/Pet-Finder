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
const port = 3002;
const SECRET_JWT = process.env.SECRET;
const app = express();
app.use(express.json());

// sign-up

app.post("/auth", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [user, userCreated] = await UserController.createUser(name, email);
    const auth = await AuthController.createAuth(user, email, password);
    res.json({ user, auth });
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

app.listen(process.env.PORT, () => console.log("escuchando puerto" + port));
