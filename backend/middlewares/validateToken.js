import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Invalid token" });
  }
};
