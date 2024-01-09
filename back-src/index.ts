import * as express from "express";
import "./dev";
import { sequelize } from "./db";
import { User, Auth, Pet, Report } from "./models/models";
import * as cors from "cors";
import * as path from "path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { authMiddleware } from "./middleware";
const port = 3002;
const SECRET_JWT = process.env.SECRET;
const app = express();
app.use(express.json());

function getSHA256ofString(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}
// sign-up

app.post("/auth", async (req, res) => {
  const { name, email, password } = req.body;
  const [user, created] = await User.findOrCreate({
    // crea o encuentra al user en la DB
    where: { email: email },
    defaults: {
      firstName: name,
      email,
    },
  });
  console.log({ created, user });
  const [auth, authCreated] = await Auth.findOrCreate({
    where: { user_id: user.get("id") },
    defaults: {
      email,
      password: getSHA256ofString(password), // pass hasheada
      user_id: user.get("id"),
    },
  });
  console.log({ auth, authCreated });
  res.json({ user, auth });
});

app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const hashPass = getSHA256ofString(password);
  const auth = await Auth.findOne({
    where: {
      email,
      password: hashPass,
    },
  });
  if (auth) {
    const token = jwt.sign({ id: auth.get("user_id") }, SECRET_JWT);
    res.json({ token });
  } else {
    res.status(404).json({ error: "email o password invalido" });
  }
});

app.listen(process.env.PORT, () => console.log("escuchando puerto" + port));
