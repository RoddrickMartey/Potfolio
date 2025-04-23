import { userCreateSchema, userUpdateSchema } from "../schemas/userSchema.js";
import { prisma } from "../utils/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const createUser = async (req, res) => {
  const user = req.body;

  const { error, value } = userCreateSchema.validate(user, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const newUser = await prisma.user.create({
      data: value,
      select: {
        username: true,
        name: true,
        email: true,
        resume: true,
        bio: true,
      },
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong. Server Error" });
  }
};

export const updateUser = async (req, res) => {
  const user = req.body;
  const userId = req.userId;

  const { error, value } = userUpdateSchema.validate(user, {
    abortEarly: true,
  });

  if (error) {
    const messages = error.details.map((err) => err.message);
    return res.status(400).json({ errors: messages });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: value,
      select: {
        username: true,
        name: true,
        email: true,
        resume: true,
        bio: true,
      },
    });

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const getMe = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        resume: true,
        bio: true,
        phoneNumbers: true,
        skills: true,
        socialLinks: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const JWT_SECRET = process.env.JWT_SECRET;
  const USERID = parseInt(process.env.USERID);

  try {
    const user = await prisma.user.findUnique({ where: { id: USERID } });
    if (!user || user.username !== username) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: "admin" }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
