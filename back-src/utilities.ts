import * as jwt from "jsonwebtoken";
import * as crypto from "crypto";

function authMiddleware(req, res, next, SECRET) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req["._user"] = data;
    next();
  } catch (error) {
    res.status(401).json({ error: true });
  }
}
function getSHA256ofString(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

export { authMiddleware, getSHA256ofString };
