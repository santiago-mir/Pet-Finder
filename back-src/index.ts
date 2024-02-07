import * as express from "express";
import { sequelize } from "./db";
import * as cors from "cors";
import * as path from "path";
import * as jwt from "jsonwebtoken";
import { authMiddleware } from "./utilities";
import { AuthController } from "./controllers/auth-controller";
import { UserController } from "./controllers/user-controller";
import { LostPetController } from "./controllers/lost-pets-controller";
import { ReportSeenPetController } from "./controllers/report-seen-pet-controller";
import { User } from "./models/user";
const port = process.env.BACK_PORT;
const SECRET_JWT = process.env.SECRET;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

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
    const user = await UserController.getOneUser(auth["id"]);
    const token = jwt.sign({ id: auth.get("user_id") }, SECRET_JWT);
    res.json({ user, token });
  } else {
    res.status(404).json({ error: "email o password incorrecto" });
  }
});
app.post("/report", authMiddleware, async (req, res) => {
  try {
    const { petName, imgURL, lat, lng, cityName } = req.body;
    const userId = req["._user"].id;
    const newReport = await LostPetController.createReport(
      petName,
      imgURL,
      cityName,
      lat,
      lng,
      userId
    );
    res.json(newReport);
  } catch (err) {
    console.log(err);
    res.status(404).json({ err });
  }
});
app.put("/edit-report", authMiddleware, async (req, res) => {
  try {
    const { petName, imgURL, lat, lng, cityName, reportId } = req.body;
    const updatedReport = await LostPetController.updateReport(
      petName,
      imgURL,
      cityName,
      lat,
      lng,
      reportId
    );
    res.json(updatedReport);
  } catch (err) {
    console.log(err);
    res.status(404).json({ err });
  }
});
app.post("/report-seen-pet", authMiddleware, async (req, res) => {
  try {
    const { information, reporterPhone, reporterName, petName, ownerId } =
      req.body;
    const reportCreated = await ReportSeenPetController.createReport(
      information,
      reporterPhone,
      reporterName,
      petName,
      ownerId
    );
    res.json(reportCreated);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});
app.put("/menu/update-data", authMiddleware, async (req, res) => {
  const { name, city } = req.body;
  const userId = req["._user"].id;
  await UserController.updateUserData(userId, name, city);
  const updatedUser = await UserController.getOneUser(userId);
  res.json(updatedUser);
});
app.get("/user/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await UserController.getOneUser(userId);
    res.json(userFound);
  } catch (error) {
    res.status(400).json(error);
  }
});
app.get("/lost-pets", async (req, res) => {
  try {
    const { lat, lng } = req.query;
    const petsFound = await LostPetController.getAllPetsAround(+lat, +lng);
    res.json(petsFound);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});
app.get("/user-reports", authMiddleware, async (req, res) => {
  try {
    const userId = req["._user"].id;
    const reportsFound = await LostPetController.getAllReports(userId);
    res.json(reportsFound);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});
app.get("/user/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.params.id;
    const userFound = await UserController.getOneUser(userId);
    res.json(userFound);
  } catch (err) {
    res.status(404).json({ error: err });
  }
});
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  const route = path.resolve(__dirname, "../dist/index.html");
  res.sendFile(route);
});

app.listen(port, () => console.log("escuchando puerto" + port));
