import { prisma } from "../utils/prisma.js";
import { visitorSchema } from "../schemas/userSchema.js";

// Add a visitor log
export const logVisitor = async (req, res) => {
  const { token, userAgent, ipAddress } = req.body;

  const { error, value } = visitorSchema.validate({
    token,
    userAgent,
    ipAddress,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const newVisitor = await prisma.visitor.create({
      data: {
        token: value.token,
        userAgent: value.userAgent,
        ipAddress: value.ipAddress,
      },
    });

    return res.status(201).json(newVisitor);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
