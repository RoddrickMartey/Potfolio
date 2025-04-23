import { prisma } from "../utils/prisma.js";
import { v4 as uuidv4 } from "uuid";

export const trackVisitor = async (req, res, next) => {
  try {
    let token = req.cookies.visitorToken;

    if (!token) {
      token = uuidv4();
      res.cookie("visitorToken", token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }); // 30 days
      await prisma.visitor.create({
        data: {
          token,
          userAgent: req.get("User-Agent") || "Unknown",
          ipAddress: req.ip,
        },
      });
    }

    req.visitorToken = token;
    next();
  } catch (error) {
    console.error("Error tracking visitor:", error);
    next(); // Don't block the request
  }
};
