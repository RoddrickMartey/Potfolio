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
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(value.password, 10); // saltRounds = 10

    const newUser = await prisma.user.create({
      data: {
        ...value,
        password: hashedPassword, // save hashed password instead
      },
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
      where: { id: Number(userId) },
      select: {
        username: true,
        name: true,
        email: true,
        resume: true,
        bio: true,
        phonenumber: true,
        skill: true,
        sociallink: true,
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
      return res.status(401).json({ error: "Invalid credentials user" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Invalid credentials password" });

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
    res.status(500).json({ error: "Server Error, Something Happens" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};
