import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";
const JWT_SECRET = process.env.SECRET;

function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req["._user"] = data;
    next();
  } catch (error) {
    res.status(401).json({ error: "token invalido" });
  }
}
function getSHA256ofString(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export { authMiddleware, getSHA256ofString };
