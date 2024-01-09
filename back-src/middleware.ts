import * as jwt from "jsonwebtoken";

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

export { authMiddleware };
